// src/components/Quiz.jsx
import React, { useState, useEffect } from 'react';
import { TOTAL_TIEMPO } from '../data';

// Componente para renderizar la estrella (SVG)
const StarIcon = ({ filled }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        className="star-icon"
        fill={filled ? '#FFD700' : 'none'}
    >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" stroke="#FFD700" strokeWidth="1.5" />
    </svg>
);


function Quiz({ preguntasData, setAppState, isTimerActive, isPaused, setIsPaused }) {
    // --- ESTADOS DEL CUESTIONARIO ---
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIEMPO);
    const [score, setScore] = useState(0);
    const [correctStreak, setCorrectStreak] = useState(0); // Racha de aciertos
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    
    // --- LÓGICA DEL TEMPORIZADOR ---
    useEffect(() => {
        if (showResult) return; // Detener si se muestran los resultados finales

        // La cuenta regresiva solo ocurre si NO está pausado, el Timer está activo, Y queda tiempo
        if (!isPaused && isTimerActive && timeLeft > 0) {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearTimeout(timerId);
        } 
        // Si el tiempo llega a 0 (y NO estamos pausados), se pasa automáticamente
        else if (!isPaused && isTimerActive && timeLeft === 0) { 
            handleAnswerSubmit(null); // Pasa sin responder
        }
    }, [timeLeft, isPaused, isTimerActive, currentQuestionIndex, showResult]);


    // --- FUNCIÓN PARA PASAR A LA SIGUIENTE PREGUNTA ---
    const nextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < preguntasData.length) {
            setCurrentQuestionIndex(nextIndex);
            setTimeLeft(TOTAL_TIEMPO); // Reiniciar tiempo
            setSelectedAnswerIndex(null); // Resetear selección
        } else {
            // Fin del cuestionario
            setShowResult(true);
        }
    };


    // --- FUNCIÓN PARA MANEJAR RESPUESTA ---
    const handleAnswerSubmit = (selectedIndex) => {
        if (selectedAnswerIndex !== null) return; // Prevenir doble click

        setSelectedAnswerIndex(selectedIndex);

        const currentQuestion = preguntasData[currentQuestionIndex];
        const isCorrect = selectedIndex !== null && currentQuestion.opciones[selectedIndex].esCorrecta;

        if (isCorrect) {
            setScore(score + 1);
            const newStreak = correctStreak + 1;
            setCorrectStreak(newStreak);
        } else {
            // Resetear racha si falla (o si el tiempo se agota)
            setCorrectStreak(0); 
        }

        // Después de 3 segundos, pasar a la siguiente pregunta (dando tiempo para leer el key point)
        setTimeout(nextQuestion, 3000);
    };

    // --- RENDERIZADO PRINCIPAL ---
    if (showResult) {
        return (
            <div className="seccion-resultados">
                <h2>✅ ¡Simulacro Terminado!</h2>
                <p>Puntuación Final: {score} de {preguntasData.length}</p>
                <p>¡Buen trabajo! Sigue repasando.</p>
                <button 
                    onClick={() => setAppState('home')} 
                    className="boton-reiniciar"
                >
                    Volver a Inicio
                </button>
            </div>
        );
    }
    
    const question = preguntasData[currentQuestionIndex];
    const totalEstrellas = 6;
    const estrellasGanadas = Math.floor(score / 10);
    const estrellaArray = Array(totalEstrellas).fill(false).map((_, i) => i < estrellasGanadas);
    
    // Determinar si mostrar la explicación
    const showExplanation = selectedAnswerIndex !== null;
    
    return (
        <div className="seccion-cuestionario">
            
            {/* --- Progreso General y Racha --- */}
            <div className="progreso-general-container">
                <div className="progreso-header">Progreso: {Math.floor((currentQuestionIndex / preguntasData.length) * 100)}%</div>
                <div className="progreso-barra-fondo">
                    <div 
                        className="progreso-barra-relleno" 
                        style={{ width: `${(currentQuestionIndex / preguntasData.length) * 100}%` }}
                    ></div>
                </div>
                
                <div className="star-racha-container">
                    <div className="estrellas">
                        {estrellaArray.map((filled, index) => (
                            <StarIcon key={index} filled={filled} />
                        ))}
                    </div>
                    <p className="racha-texto">
                        Racha: {correctStreak} {correctStreak === 1 ? 'acierto' : 'aciertos'} | ¡A {10 - (score % 10)} para la próxima estrella!
                    </p>
                </div>
            </div>
            
            <hr className="divider-neon"/>
            
            {/* --- Sección de Pregunta y Temporizador --- */}
            <div className="seccion-pregunta">
                
                <div className="temporizador-container">
                    {/* Texto del tiempo - SOLO visible si el timer está activo */}
                    {isTimerActive && (
                        <div className="tiempo-texto">
                            {timeLeft}s
                        </div>
                    )}
                    
                    <div className="progreso-barra-fondo-timer">
                        {/* Barra de progreso - El ancho depende del tiempo restante */}
                        {isTimerActive && (
                            <div 
                                className="progreso-bar" 
                                style={{ width: `${(timeLeft / TOTAL_TIEMPO) * 100}%` }}
                            ></div>
                        )}
                        <div className="contador-pregunta">
                            Pregunta {currentQuestionIndex + 1}/{preguntasData.length}
                        </div>
                    </div>
                    
                    {/* Botón de Pausa (solo si el timer está activo y no se ha respondido) */}
                    {isTimerActive && (
                        <button 
                            onClick={() => setIsPaused(prev => !prev)} 
                            className="boton-pausa"
                            disabled={selectedAnswerIndex !== null}
                        >
                            {isPaused ? '▶️ Reanudar' : '⏸️ Pausar'}
                        </button>
                    )}
                </div>

                <h3 className="titulo-pregunta">{question.pregunta}</h3>

                {/* --- Opciones de Respuesta --- */}
                <div className="seccion-opciones">
                    {question.opciones.map((opcion, index) => {
                        const isSelected = selectedAnswerIndex === index;
                        const isDisabled = selectedAnswerIndex !== null;
                        
                        let className = "boton-opcion";
                        if (isDisabled) {
                            if (opcion.esCorrecta) {
                                className += " correcto-resaltado"; // Verde para la correcta
                            } else if (isSelected && !opcion.esCorrecta) {
                                className += " incorrecto-resaltado"; // Rojo/Sombra para la incorrecta seleccionada
                            }
                        } else if (isSelected) {
                            className += " seleccionado"; // Resaltar si está seleccionada antes de la respuesta
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswerSubmit(index)}
                                disabled={isDisabled}
                                className={className}
                            >
                                {opcion.texto}
                            </button>
                        );
                    })}
                </div>
            </div>
            
            {/* --- Explicación / Key Point (SOLO visible después de responder) --- */}
            {showExplanation && (
                <div className="feedback-box">
                    <p><strong>Explicación:</strong> {question.explicacion}</p>
                </div>
            )}
        </div>
    );
}

export default Quiz;