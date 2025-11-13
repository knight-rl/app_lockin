// IMPORTANTE: Este código requiere las librerías: @google/genai, formidable, pdf-parse
// La instalación de estas librerías la harás después en la configuración de Vercel.

import { GoogleGenAI } from "@google/genai";
import formidable from 'formidable';
import fs from 'fs'; 
import pdf from 'pdf-parse';

// Inicializa la IA. La clave de API se leerá automáticamente de las variables de entorno de Vercel (GEMINI_API_KEY)
const ai = new GoogleGenAI({});

// Esquema JSON para asegurar que la IA devuelva el formato correcto
const QUIZ_JSON_SCHEMA = {
    type: "array",
    items: {
        type: "object",
        properties: {
            id: { type: "number" },
            pregunta: { type: "string" },
            opciones: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        texto: { type: "string" },
                        esCorrecta: { type: "boolean" }
                    },
                    required: ["texto", "esCorrecta"]
                }
            },
            explicacion: { type: "string", description: "Un Key Point o explicación concisa de por qué la respuesta es correcta." }
        },
        required: ["id", "pregunta", "opciones", "explicacion"]
    }
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Solo se permiten métodos POST.' });
    }

    try {
        // 1. Manejar la carga del archivo PDF
        const form = formidable({ 
            maxFileSize: 5 * 1024 * 1024, // Limitar a 5MB
            multiples: false 
        });

        const [fields, files] = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) return reject(err);
                resolve([fields, files]);
            });
        });

        const pdfFile = files.file?.[0];
        if (!pdfFile) {
            return res.status(400).json({ error: "No se encontró el archivo PDF en la solicitud." });
        }
        
        // 2. Leer el PDF y extraer el texto
        const dataBuffer = fs.readFileSync(pdfFile.filepath);
        const data = await pdf(dataBuffer);
        const extractedText = data.text;

        if (extractedText.length < 50) {
            return res.status(400).json({ error: "El PDF es muy corto o no se pudo extraer texto relevante." });
        }

        // 3. Crear el Prompt para la IA
        const prompt = `Eres un experto diseñador de cuestionarios para estudiantes de medicina. Analiza el siguiente texto de estudio y genera un cuestionario de 10 a 15 preguntas de opción múltiple (3-4 opciones cada una) basadas en el contenido. La respuesta debe ser SOLO un array JSON que siga el esquema proporcionado. El contenido es: ${extractedText}`;

        // 4. Llamar a la Gemini API
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
                responseMimeType: "application/json",
                responseSchema: QUIZ_JSON_SCHEMA,
                temperature: 0.5,
            }
        });
        
        // 5. Devolver el JSON limpio al Frontend
        const jsonText = response.text.trim();
        const quizData = JSON.parse(jsonText);
        
        return res.status(200).json({ success: true, quiz: quizData });

    } catch (error) {
        console.error("Error al generar el cuestionario:", error);
        return res.status(500).json({ 
            success: false, 
            error: "Error interno del servidor al procesar el PDF o generar la respuesta. Revisa si el PDF es legible." 
        });
    }
}
