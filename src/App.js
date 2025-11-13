// src/App.jsx
import React, { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import { preguntasData as defaultPreguntas } from './data';
import './style.css'; 

function App() {
    // --- ESTADOS GLOBALES ---
    const [appState, setAppState] = useState('home'); // 'home', 'quiz', 'upload'
    const [isPaused, setIsPaused] = useState(false);
    const [isTimerActive, setIsTimerActive] = useState(true); 
    const [preguntasData, setPreguntasData] = useState(defaultPreguntas);

    // --- ESTADOS PARA CARGA DE ARCHIVOS ---
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Maneja la selección de archivo
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setError(null);
        } else {
            setFile(null);
            setError("Por favor, selecciona un archivo PDF válido.");
        }
    };

    // Función que eventualmente enviará el PDF al servidor de IA
    const handleGenerateQuiz = async () => {
        if (!file) {
            setError("Debes seleccionar un archivo para generar el cuestionario.");
            return;
        }

        setLoading(true);
        setError(null);
        
        // --- AQUÍ IRÁ EL CÓDIGO REAL DEL SERVIDOR/IA (FUTURO) ---
        
        // **ACTUAL:** Simulación de espera y error para demostrar la UI
        console.log(`Simulando envío de archivo: ${file.name}`);
        
        setTimeout(() => {
            setLoading(false);
            // Simulación de éxito (carga tus preguntas por defecto para volver al quiz)
            // Cuando la IA funcione, aquí iría: setPreguntasData(responseJSON);
            
            // Para probar la navegación:
            setPreguntasData(defaultPreguntas); 
            setAppState('quiz'); 
        }, 4000); 
    };

    // --- VISTAS CONDICIONALES ---
    let CurrentView;

    switch (appState) {
        case 'quiz':
            CurrentView = (
                <Quiz 
                    preguntasData={preguntasData} 
                    setAppState={setAppState}
                    isTimerActive={isTimerActive}
                    isPaused={isPaused}
                    setIsPaused={setIsPaused}
                />
            );
            break;
        case 'upload':
            // --- NUEVA VISTA DE CARGA ---
            CurrentView = (
                <div className="seccion-carga">
                    <h2>📂 Carga tu Documento</h2>
                    <p className="subtitulo">Sube un archivo PDF para que nuestra IA genere un deck de estudio personalizado.</p>
                    
                    <input 
                        type="file" 
                        accept=".pdf" 
                        onChange={handleFileChange}
                        className="input-file"
                        disabled={loading}
                    />
                    
                    {file && <p className="file-name-info">Archivo seleccionado: <strong>{file.name}</strong></p>}

                    <button 
                        onClick={handleGenerateQuiz} 
                        disabled={!file || loading}
                        className="boton-principal"
                        style={{ marginTop: '20px', width: '100%' }}
                    >
                        {loading ? '🧠 Generando Preguntas...' : 'Generar Cuestionario con IA'}
                    </button>
                    
                    {error && <p className="mensaje-error">{error}</p>}
                    {loading && <p className="mensaje-loading">⌛ Analizando tu contenido. Esto puede tardar hasta un minuto...</p>}

                    <button 
                        onClick={() => setAppState('home')} 
                        className="boton-secundario"
                        style={{ marginTop: '20px', width: '100%' }}
                        disabled={loading}
                    >
                        Volver a Inicio
                    </button>
                </div>
            );
            break;
        case 'home':
        default:
            CurrentView = (
                <Home 
                    setAppState={setAppState} 
                    isTimerActive={isTimerActive}
                    setIsTimerActive={setIsTimerActive}
                />
            );
            break;
    }

    return (
        <div className="app">
            {CurrentView}
        </div>
    );
}

export default App;