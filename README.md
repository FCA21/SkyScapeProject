## SkyScapeProject

**VISIÓN DE PROYECTO**

SkyScape busca proporcionar a los entusiastas de las actividades al aire libre una experiencia integral y organizada para explorar, planificar y disfrutar de diversas actividades. La visión de nuestro proyecto se centra en ofrecer a los usuarios las herramientas necesarias para descubrir nuevas actividades, gestionar su agenda y obtener información relevante sobre el clima en sus destinos seleccionados, conectando al usuario con la naturaleza a través de emocionantes experiencias en entornos naturales. 

**HISTORIAS DE USUARIOS**

Usuarios potenciales
Personas apasionadas por las actividades al aire libre, que buscan aventuras, conexión con la naturaleza y experiencias memorables. El usuario debería tener cierta capacidad física para poder realizar ciertas actividades que pueden tener un mayor grado de dificultad.


*Historias de usuarios*

User story 1:
Persona que quiere disfrutar de una experiencia segura:
Como usuario que planea una actividad al aire libre, quiero acceder a información meteorológica precisa y actualizada en el lugar y fecha de mi actividad, para tomar decisiones informadas y garantizar una experiencia segura y agradable.

User story 2:
Persona entusiasta de la naturaleza:
Laura es una entusiasta de la naturaleza y las actividades al aire libre. Tiene un estilo de vida activo y busca constantemente nuevas formas de explorar el mundo natural. Trabaja a tiempo completo, pero siempre reserva tiempo para desconectar y sumergirse en la naturaleza los fines de semana o durante sus vacaciones.

User story 3:
Persona amante del camping:
Usuario amante de las acampadas que quiere disfrutar de  un fin de semana en un camping de la isla. Busca unos días frescos huyendo del calor de la costa, por ello usa la web para conocer la predicción del tiempo en el camping de Bailico, Tejeda.

**OBJETIVOS PRINCIPALES**

Registro y Acceso a Actividades:
Permitir a los usuarios registrarse de manera sencilla y acceder a una amplia gama de actividades al aire libre disponibles.
Proporcionar una interfaz intuitiva que les permita buscar, explorar y seleccionar actividades según sus preferencias e intereses.
Organización a través de un Calendario:
Ofrecer a los usuarios la capacidad de organizar y programar actividades mediante un calendario integrado.
Permitir la gestión flexible de horarios, la visualización y edición de actividades planificadas.
Información Climática en Tiempo Real:
Integrar un servicio de información meteorológica para proporcionar a los usuarios datos precisos sobre el clima en los lugares y fechas seleccionados para las actividades.
Mostrar de manera clara y accesible la información climática relevante para que los usuarios puedan tomar decisiones informadas.

**ROLES DE USERS**

Admin = ASBAT

Usuarios comunes = USBAT

### Members Endpoints
**USUARIOS**

| METHOD | ENDPOINT                  | TOKEN | ROLE  | DESCRIPTION                  | POST PARAMS                | RETURNS                              |
| ------ | ------------------------- | ----- | ----- | ---------------------------- | -------------------------- | ------------------------------------ |
| GET    | /users                  | YES   | Admin | Get all users                  | -                          | [{ user }]                           |
| GET    | /users/:userId          | YES   | Admin | Get one user                   | user_id                    | { user }                             |
| PUT    | /users/:userId          | YES   | Admin | Update user                    | user_id                    | "User updated"                       |
| POST   | /users                  | YES   | Admin | Create one user                | req.body                   | "User created"                       |
| DELETE | /users/:userId          | YES   | Admin | Remove one user                | user_id                    | "User deleted"                       |

**SENDERISMO**

| METHOD | ENDPOINT                  | TOKEN | ROLE  | DESCRIPTION                  | POST PARAMS                | RETURNS                              |
| ------ | ------------------------- | ----- | ----- | ---------------------------- | -------------------------- | ------------------------------------ |
| GET    | /senderismo               | YES   | User  | Get all senderismo           | -                          | [{ senderismo }]                     |  
| GET    | /senderismo/:senderismoId | YES   | User  | Get one senderismo           | senderismo_id              | { senderismo }                       |
| PUT    | /senderismo/:animalId     | YES   | Admin | Update senderismo            | senderismo_id              | "senderismo updated"                 |
| POST   | /senderismo               | YES   | Admin | Create one senderismo        | req.body                   | "senderismo created"                 |
| DELETE | /senderismo/:senderismoId | YES   | Admin | Remove one senderismo        | senderismo_id              | "senderismo deleted"                 |

**CICLISMO**

| METHOD | ENDPOINT                  | TOKEN | ROLE  | DESCRIPTION                  | POST PARAMS                | RETURNS                              |
| ------ | ------------------------- | ----- | ----- | ---------------------------- | -------------------------- | ------------------------------------ |
| GET    | /ciclismo                 | YES   | User  | Get all ciclismo             | -                          | [{ ciclismo }]                       |  
| GET    | /ciclismo/:ciclismoId     | YES   | User  | Get one ciclismo             | ciclismo_id                | { ciclismo }                         |
| PUT    | /ciclismo/:ciclismoId     | YES   | Admin | Update ciclismo              | ciclismo_id                | "ciclismo updated"                   |
| POST   | /ciclismo                 | YES   | Admin | Create one ciclismo          | req.body                   | "ciclismo created"                   |
| DELETE | /ciclismo/:ciclismoId     | YES   | Admin | Remove one ciclismo          | ciclismo_id                | "ciclismo deleted"                   |

**CAMPING**

| METHOD | ENDPOINT                  | TOKEN | ROLE  | DESCRIPTION                  | POST PARAMS                | RETURNS                              |
| ------ | ------------------------- | ----- | ----- | ---------------------------- | -------------------------- | ------------------------------------ |
| GET    | /camping                  | YES   | User  | Get all camping              | -                          | [{ camping }]                        |  
| GET    | /camping/:campingId       | YES   | User  | Get one camping              | camping_id                 | { camping }                          |
| PUT    | /camping/:campingId       | YES   | Admin | Update camping               | camping_id                 | "camping updated"                    |
| POST   | /camping                  | YES   | Admin | Create one camping           | req.body                   | "camping created"                    |
| DELETE | /camping/:campingId       | YES   | Admin | Remove one camping           | camping_id                 | "camping deleted"                    |

**PLAYA**

| METHOD | ENDPOINT                  | TOKEN | ROLE  | DESCRIPTION                  | POST PARAMS                | RETURNS                              |
| ------ | ------------------------- | ----- | ----- | ---------------------------- | -------------------------- | ------------------------------------ |
| GET    | /playa                    | YES   | User  | Get all playa                | -                          | [{ playa }]                          |  
| GET    | /playa/:playaId           | YES   | User  | Get one playa                | playa_id                   | { playa }                            |
| PUT    | /playa/:playaId           | YES   | Admin | Update playa                 | playa_id                   | "playa updated"                      |
| POST   | /playa                    | YES   | Admin | Create one playa             | req.body                   | "playa created"                      |
| DELETE | /playa/:playaId           | YES   | Admin | Remove one playa             | playa_id                   | "playa deleted"                      |

**OBSERVACION_ESTRELLAS**

| METHOD | ENDPOINT                           | TOKEN | ROLE  | DESCRIPTION                         | POST PARAMS                | RETURNS                                    |
| ------ | ---------------------------------- | ----- | ----- | ----------------------------------- | -------------------------- | ------------------------------------------ |
| GET    | /observacionEstrellas               | YES   | User  | Get all observacionEstrellas       | -                          | [{ observacionEstrellas }]                  |  
| GET    | /observacionEstrellas/:observacionId| YES  | User  | Get one observacionEstrellas        | observacion_id             | { observacionEstrellas }                    |
| PUT    | /observacionEstrellas/:observacionId| YES  | Admin | Update observacionEstrellas         | observacion_id             | "observacionEstrellas updated"              |
| POST   | /observacionEstrellas               | YES   | Admin | Create one observacionEstrellas    | req.body                   | "observacionEstrellas created"              |
| DELETE | /observacionEstrellas/:observacionId| YES  | Admin | Remove one observacionEstrellas     | observacion_id             | "observacionEstrellas deleted"              |

**BUCEO**

| METHOD | ENDPOINT            | TOKEN | ROLE  | DESCRIPTION                  | POST PARAMS        | RETURNS                |
| ------ | ------------------- | ----- | ----- | ---------------------------- | ------------------ | ---------------------- |
| GET    | /buceo              | YES   | User  | Get all buceo                | -                  | [{ buceo }]            |  
| GET    | /buceo/:buceoId     | YES   | User  | Get one buceo                | buceo_id           | { buceo }              |
| PUT    | /buceo/:buceoId     | YES   | Admin | Update buceo                 | buceo_id           | "buceo updated"        |
| POST   | /buceo              | YES   | Admin | Create one buceo             | req.body           | "buceo created"        |
| DELETE | /buceo/:buceoId     | YES   | Admin | Remove one buceo             | buceo_id           | "buceo deleted"        |

**SURF**

| METHOD | ENDPOINT          | TOKEN | ROLE  | DESCRIPTION                | POST PARAMS        | RETURNS              |
| ------ | ----------------- | ----- | ----- | -------------------------- | ------------------ | -------------------- |
| GET    | /surf            | YES   | User   | Get all surf               | -                  | [{ surf }]           |  
| GET    | /surf/:surfId    | YES   | User   | Get one surf               | surf_id            | { surf }             |
| PUT    | /surf/:surfId    | YES   | Admin  | Update surf                | surf_id            | "surf updated"       |
| POST   | /surf            | YES   | Admin  | Create one surf            | req.body           | "surf created"       |
| DELETE | /surf/:surfId    | YES   | Admin  | Remove one surf            | surf_id            | "surf deleted"       |




