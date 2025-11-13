// src/components/Home.jsx
import React from 'react';

function Home({ setAppState, isTimerActive, setIsTimerActive }) {
    
    // Función para manejar el inicio del cuestionario
    const handleStart = () => {
        setAppState('quiz');
    };

    return (
        <div className="home-screen">
            <h1 className="titulo-app">TIME TO LOCK IN</h1>
            <p className="subtitulo">¿Puedes pasar tu examen?¡Averígualo ahora!</p>

            {/* Opción de Configuración del Timer */}
            <div className="config-timer-container">
                <label className="switch-label">
                    <input 
                        type="checkbox" 
                        checked={isTimerActive} 
                        onChange={() => setIsTimerActive(!isTimerActive)}
                    />
                    <span className="slider round"></span>
                </label>
                <span className="config-text">
                    {isTimerActive ? 'Timer Activo (15s/pregunta)' : 'Timer Desactivado (Sin Límite)'}
                </span>
            </div>
            
            <hr className="divider-neon"/>

            {/* Botones de Navegación */}
            <div className="opciones-inicio">
                <button 
                    onClick={handleStart} 
                    className="boton-principal"
                >
                    🚀 Empezar Examen por Defecto
                </button>
                
                {/* Botón de Carga de PDF (Futura Implementación) */}
                <button 
                    onClick={() => setAppState('upload')} 
                    className="boton-secundario"
                >
                    📂 Cargar Mi Propio PDF
                </button>
            </div>
        </div>
    );
}

export default Home;