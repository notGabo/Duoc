Definición

Las vistas de arquitectura 4+1 fueron definidas por Kruchten para describir todo el sistema desde distintos puntos de vista, esto sea la infraestructura asociada al proyecto, las funcionalidades de la aplicación, el despliegue que tendrá asociado, los procesos internos del sistema y una que unificará todo lo anterior. Esto se realiza mediante diagramas que, normalmente, se desarrollan en UML (Lenguaje unificado de modelado), a menos que esto sea imposible, como en el diagrama topológico de infraestructura. En esencia, se busca mostrar de manera sencilla como funcionará el sistema, mediante diagramas que son de comprensión estándar. Las 5 vistas utilizadas para esto son:

Vista lógica: Esta vista se enfoca en desarrollar las funcionalidades que tendrá la aplicación para el usuario final, mostrando las capacidades que va a tener cada usuario y sus relaciones. Representada por un diagrama de clases o un diagrama de secuencia.

Vista despliegue: La visión de estos diagramas es comprender, desde el enfoque de un desarrollador, como funcionará el sistema, dividiéndolo en los artefactos y componentes correspondientes. Normalmente está representada por un diagrama de componentes o un diagrama de paquetes.

Vista procesos: Se muestran todos los procesos que posee el sistema y las relaciones que estos tienen, es decir, como se comunican entre si. Es el flujo de trabajo que se seguirá con el funcionamiento de la aplicación. Para poder visualizarla se diseña un diagrama de actividad o un diagrama de flujo.

Vista física: El foco de esta vista es mostrar la infraestructura asociada al sistema, como se relacionarán y las conexiones físicas que existirán. En UML se puede representar por un diagrama de despliegue, pero también existe el diagrama topológico de infraestructura.

Vista escenarios: Esta vista es la unión de las 4 anteriores (+1) y representará los casos de uso del sistema, es decir, las funcionalidades que tendrá y la relación entre sí, así como con los actores del sistema. Se debe representar por un diagrama de casos de uso.