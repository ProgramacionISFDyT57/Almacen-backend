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

## Venta

### Post/venta/crear

Se crea una nueva venta y se la ingresa a la base de datos

*Formato de respuesta*
~~~
Json
[
    {
    “Mensaje”: “Venta agregada a la base de datos”,
    “id”:” hfberiufuifbpiub43kth4blk34jb3iy3o4y5oi345go345gui”
    }
]
~~~

### Put/venta/insertar_producto/:_id

A la venta ya creada le ingresamos los productos que van a formar parte de esa venta

*Parámetro de ruta*
~~~
:_id=232454676iyujtht4
~~~

*Cuerpo de solicitud*
~~~
Json
[
    {
    “id”:”4iuu35i34ub534h6bio634p63”,
    “cantidad”:”3”
    }
]
~~~

*Formato de respuesta*
~~~
“Se ha agregado el objeto a la venta”
~~~

### Get/venta/listar

Devuelve un listado de todas las ventas existentes en la base de datos

*Formato de respuesta*
~~~
Json
[
    {
    “Id”:””,
    “Fecha”:”15/4/20”
    “Monto total”:”240”
    }
]
~~~
*Productos de la venta*
~~~
[
    {
    “Nombre”: “”
    “Cantidad”:”3”,
    “Marca”: “”
    “Precio”:”80”,
    “Código de barras”:””
    }
]
~~~
### Put/venta/sacarmonto/:_id

Calcula el monto total de la venta teniendo en cuenta el precio de cada uno de los productos que forman parte de la venta ya creada

*Parámetro de ruta*
~~~
:_id=23243456576jhg445h4
~~~
*Formato de respuesta*
~~~
Json
[
    {
    “Mensaje”: “Venta modificada y finalizada”,
    “Monto total”:”240”
    }
]
~~~

### Delete/venta/borrar

Borra las ventas de la base de datos

*Formato de respuesta*
~~~
“Se borraron x venta/s”
~~~

### Get/venta/buscar/:_id

Nos permite obtener una venta a través del id

*Parámetro de ruta*
~~~
:_id=234565ytbef435
~~~
*Formato de respuesta*
~~~
Json
[
    {
    “Id”:””,
    “Fecha”:”15/4/20”
    “Monto total”:”240”
    }
]
~~~
*Productos de la venta*
~~~
[
    {
    “Nombre”: “”
    “Cantidad”:”3”,
    “Marca”: “”
    “Precio”:”80”,
    “Código de barras”:””
    }
]
~~~

