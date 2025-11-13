// src/data.js
export const preguntasData = [
  {
      id: 1,
      pregunta: "¿Qué estructura anatómica es la principal responsable de la producción de insulina en el páncreas?",
      opciones: [
          { texto: "Células alfa de los islotes de Langerhans.", esCorrecta: false },
          { texto: "Células beta de los islotes de Langerhans.", esCorrecta: true },
          { texto: "Conducto de Wirsung.", esCorrecta: false },
          { texto: "Células acinares.", esCorrecta: false },
      ],
      explicacion: "Key Point: Las células beta (β) de los islotes de Langerhans son las únicas encargadas de sintetizar y secretar insulina, la hormona que regula la glucemia.",
  },
  {
      id: 2,
      pregunta: "¿Cuál de los siguientes pares craneales es primariamente responsable de la visión?",
      opciones: [
          { texto: "Nervio Oculomotor (III).", esCorrecta: false },
          { texto: "Nervio Óptico (II).", esCorrecta: true },
          { texto: "Nervio Troclear (IV).", esCorrecta: false },
      ],
      explicacion: "Key Point: El Nervio Óptico (II par) es puramente sensitivo y transmite la información visual desde la retina hasta el cerebro.",
  },
  {
      id: 3,
      pregunta: "¿Cuál es el componente sanguíneo encargado de transportar la mayor parte del oxígeno en el cuerpo?",
      opciones: [
          { texto: "Plasma.", esCorrecta: false },
          { texto: "Leucocitos.", esCorrecta: false },
          { texto: "Hemoglobina.", esCorrecta: true },
      ],
      explicacion: "Key Point: La hemoglobina, una proteína presente en los eritrocitos (glóbulos rojos), contiene hierro que se une al oxígeno para su transporte.",
  },
  {
      id: 4,
      pregunta: "¿Qué parte del sistema nervioso autónomo se activa en situaciones de 'lucha o huida' (fight or flight)?",
      opciones: [
          { texto: "Sistema Nervioso Entérico.", esCorrecta: false },
          { texto: "Sistema Nervioso Parasimpático.", esCorrecta: false },
          { texto: "Sistema Nervioso Simpático.", esCorrecta: true },
      ],
      explicacion: "Key Point: El Sistema Nervioso Simpático prepara al cuerpo para una respuesta de emergencia, aumentando la frecuencia cardíaca y desviando el flujo sanguíneo a los músculos.",
  },
  {
      id: 5,
      pregunta: "¿En qué porción del nefrón ocurre la mayor parte de la reabsorción de agua y solutos?",
      opciones: [
          { texto: "Túbulo contorneado distal.", esCorrecta: false },
          { texto: "Asa de Henle ascendente.", esCorrecta: false },
          { texto: "Túbulo contorneado proximal.", esCorrecta: true },
      ],
      explicacion: "Key Point: El túbulo contorneado proximal reabsorbe aproximadamente el 65% del agua, sodio, potasio y cloro filtrados, siendo la parte más activa del nefrón.",
  },
  {
      id: 6,
      pregunta: "¿Cuál es la principal fuente de energía de las células en condiciones aeróbicas?",
      opciones: [
          { texto: "Ácidos grasos.", esCorrecta: false },
          { texto: "Aminoácidos.", esCorrecta: false },
          { texto: "Glucosa.", esCorrecta: true },
      ],
      explicacion: "Key Point: La glucosa es el sustrato primario y más rápido para la producción de ATP a través de la glucólisis y la fosforilación oxidativa.",
  },
  {
      id: 7,
      pregunta: "¿Qué clase de fármacos se utiliza típicamente como primera línea en el tratamiento de la hipertensión no complicada?",
      opciones: [
          { texto: "Anticoagulantes (ej. Warfarina).", esCorrecta: false },
          { texto: "Diuréticos tiazídicos (ej. Hidroclorotiazida).", esCorrecta: true },
          { texto: "Glucocorticoides (ej. Prednisona).", esCorrecta: false },
      ],
      explicacion: "Key Point: Los diuréticos tiazídicos son la clase de medicamentos más recomendada para el manejo inicial de la hipertensión arterial en adultos sin comorbilidades específicas.",
  },
  {
      id: 8,
      pregunta: "¿Qué capa de la piel contiene principalmente adipocitos y sirve para el aislamiento térmico y el almacenamiento de energía?",
      opciones: [
          { texto: "Epidermis.", esCorrecta: false },
          { texto: "Dermis.", esCorrecta: false },
          { texto: "Hipodermis (tejido subcutáneo).", esCorrecta: true },
      ],
      explicacion: "Key Point: La Hipodermis, o tejido subcutáneo, está compuesta principalmente por tejido adiposo y proporciona amortiguación y aislamiento.",
  },
  {
      id: 9,
      pregunta: "¿Qué vitamina es esencial para la coagulación sanguínea y se sintetiza parcialmente por bacterias intestinales?",
      opciones: [
          { texto: "Vitamina C.", esCorrecta: false },
          { texto: "Vitamina D.", esCorrecta: false },
          { texto: "Vitamina K.", esCorrecta: true },
      ],
      explicacion: "Key Point: La Vitamina K es crucial para la activación de factores de coagulación (II, VII, IX, X) y se obtiene de la dieta y de la flora bacteriana intestinal.",
  },
  {
      id: 10,
      pregunta: "¿Cuál es la válvula cardíaca ubicada entre el ventrículo izquierdo y la aorta?",
      opciones: [
          { texto: "Válvula tricúspide.", esCorrecta: false },
          { texto: "Válvula pulmonar.", esCorrecta: false },
          { texto: "Válvula mitral (bicúspide).", esCorrecta: false },
          { texto: "Válvula aórtica.", esCorrecta: true },
      ],
      explicacion: "Key Point: La Válvula aórtica es una válvula semilunar que previene el reflujo de sangre de la aorta hacia el ventrículo izquierdo durante la diástole.",
  },
];

export const TOTAL_TIEMPO = 15; // Tiempo por pregunta en segundos