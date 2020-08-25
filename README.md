    # Proyecto backend para almacén 
    
      ##  Sistema para almacén
      
**Este sistema busca brindar una plataforma para la gestión de inventario, de compras y de ventas de un negocio con el fin de reducir la carga de trabajo en un 50%**

*El objetivo del mismo es:*

-Brindar una plataforma para lograr un mejor control de stock; y un mejor acceso a la información, mediante una herramienta segura y de fácil manejo con el fin de obtener un aumento del 40% en las ventas. 

*Alcance de la aplicación:*

  - Gestionar el control de compras: dejar registrado que tipo de mercadería se compró, la cantidad, el margen de ganancia.
  - Llevar a cabo el control de stock: mantener el control de mercadería ingresada de forma clara, para luego reponer la mercadería faltante con mayor eficiencia
  - Realizar un control de las ventas: registrar que se vende, el monto ingresado por el producto. 
  
  ***El único rol lo va a tener el dueño del negocio, por lo tanto, él tendrá acceso a todas las funciones del sistema***
  
  ___
  
  ### Ruta [Ruta] (htpps://localhost3000/ "Haz click aquí")
  
  ## Todas las ruta, (excepto/login), deben recibir el siguiente encabezado
  
  #### Encabezado
 ~~~
Json
[
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYXF1aUBnbWFpbC5jb20iLCJub21icmUiOiJqb2FxdWkiLCJmZWNoYSI6IjIwMTktMTAtMjhUMjM6MjA6MTIuMjUyWiIsIm
    lhdCI6MTU3MjMwNDgxMn0.l6AFo7UirafIo0ubkITm52adlw615mh4RwNMdObTHmM"
    }
]  
  ~~~
  
  ## Iniciar Sesión
  
  #### Post/login

 Devuelve token de autenticación requerido para el resto de solicitudes

*Cuerpo de solicitud*

~~~

Json
[
    {
    “nombre”: “Joaquín”,
    “mail”:joaquin@gmail.com,
    “Clave”:123456789”
    }
]
~~~

*Formato de respuesta*

~~~
Json
[
    {
    “Mensaje”:” Sesión iniciada con éxito”,
     “token”:”eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYXF1aUBnbWFpbC5jb20iLCJub21icmUiOiJqb2FxdWkiLCJmZWNoYSI6IjIwMTktMTAtMjhUMjM6MjA6MTIuMjU
            yWiIsImlhdCI6MTU3MjMwNDgxMn0.l6AFo7UirafIo0ubkITm52adlw615mh4RwNMdObTHmM “
    }
]
~~~

## Producto

#### Post/producto/crear

Agrega un nuevo producto a la base de datos

*Cuerpo de solicitud*
~~~
Json
[
    {
    *Nombre 
    *Cantidad
    *Marca
    *Precio
    *Código de barras
    }
 ]
  ~~~
*Formato de respuesta*
~~~
Json
[
    {
    “mensaje”: “Producto agregado a la base de datos”
    }
]
~~~

### Get/producto/listar

Devuelve un listado de todos los productos existentes en la base de datos

*Formato de respuesta*
~~~
Json
[
    {
    "Id": "", 
    “Nombre”: “”,
    “Cantidad”:” ”,
    “Marca” :””
    “Precio”: “ ”,
    “Código de barras”:””
    }
]
~~~

### Delete/producto/borrar/:_id

Borramos el producto a través del id

*Parámetro de ruta*
~~~
:_id=524g245g45g52gg4
~~~
*Formato de respuesta*
~~~
” Se borró correctamente”
~~~

### Get/producto/buscar

Devuelve uno o más productos según la propiedad de producto utilizada para buscar

*Formato de respuesta*
~~~
Json
[
    {
    “id”:””,
    “Nombre”: “”,
    “Cantidad”:”3”,
    “Marca”:” ”
    “Precio”: “80”,
    “Código de barras”:””
    }
 ]
 ~~~
 
 ### Put/producto/modificar/:_id
 
 Se modifica una o más propiedades del producto según se desee
 
 *Parámetro de ruta*
 ~~~
 :_id=122345667jrthegf3r24t
 ~~~

*Cuerpo de solicitud*
~~~
Json
[
    {
    “Nombre”: “”,
    “Cantidad”:”3”,
    “Marca”:””
    “Precio”: “80”,
    “Código de barras”:””
    }
 ]
 ~~~
 
 *Formato de respuesta*
 ~~~
 “Se modificó correctamente el producto”
 ~~~

