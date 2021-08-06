## Introducción

Bnext sigue creciendo teniendo ya presencial en España y México y ha adquirido la licencia de dinero electrónico lo que nos enfrenta a nuevos retos. Para ello, los objetivos principales en 2020 son crecer la base de clientes, asegurando que estos clientes usan la plataforma. 

## Contexto del Caso

Dentro de la aplicación BNEXT en España se va a potenciar el sistema de referidos, que permitirá a un usuario de Bnext invitar a los contactos que tenga guardados en su agenda y obtener una promoción cuando activen una tarjeta Bnext. 

Queremos desarrollar una funcionalidad por la que la aplicación mobile llame a un API para enviarnos los números de teléfono que los clientes tienen almacenados en su agenda. 

## Tarea propuesta

Desarrollar un API documentada con sus sistemas de test para dar solución a esta necesidad preferiblemente con node / nest.

**Endpoints a desarrollar**

- **Endpoint para crear un usuario**

    Este endpoint creará un usuario en el ecosistema Bnext. 

    **Parámetros de entrada**

    ```json
    {
      "name": "<nombre>",
      "lastName": "<lastName>",
      "phone": "<phone>"
    }
    ```

- **Endpoint para Guardar/Actualizar los contactos de la agenda un usuario.**

    Este endpoint asociará una serie de números de teléfono a un cliente de Bnext.

    Parámetros de entrada:

    ```json5
    [
        {
          "contactName": "<nombre>",
          "phone": "<phone>"
        },
        {
          "contactName": "<nombre>",
          "phone": "<phone>"
        },
        // ...
    ]
    ```

- **Endpoint para obtener los contactos comunes registrados en Bnext entre dos usuarios.**

    Este endpoint devolverá los contactos comunes entre dos usuarios registrados en Bnext. Es decir, los contactos que ambos usuarios tienen en sus agendas y que también **están registrados en Bnext.**

    Parámetros de entrada: 

    - userId1
    - userId2

- **Endpoint para obtener los contactos de un usuario**

    Este endpoint devolverá todos los contactos asociados a un usuario 

## Requisitos en la elaboración de la prueba

- Se puede preguntar si existe cualquier duda
- Utilizar NodeJS.
- Base de datos: MongoDB o MySQL.
- La elección de los nombres de los endpoints y la documentación quedan a discreción del programador
- Utiliza la API [https://www.neutrinoapi.com/](https://www.neutrinoapi.com/) para obtener información adicional de cada número de teléfono y verificar si es válido.
- Entrega del desarrollo
    - Repositorio GIT (GitHub, BitBucket, GitLab) del desarrollo
    - Docker donde poder ejecutar el proyecto en local.
- Se valorará:
    - El uso del framework NestJS.
    - La gestión de errores y formatos de respuesta.
    - Validaciones de tipos de datos.
    - Test

## Cómo entregar los RESULTADOS

La **solución del caso** debe ser enviada a los siguientes emails:

- Email principal: am@bnext.es
- CC: avg@bnext.es
- CC: [nuria.juan@bnext.es](mailto:nuria.juan@bnext.es)
- CC: jm@bnext.es
- CC: [victor.anton@bnext.es](mailto:victor.anton@bnext.es)

## Contactos

[Copy of Contactos ](https://www.notion.so/b9723a58dfee42d58dd9739ce25c5797)

