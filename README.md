   # Bienvenidos al proyecto backend  
    
 ##  Es un sistema para almacén
      
**Este sistema busca brindar una plataforma para la gestión de inventario, de compras y de ventas de un negocio con el fin de reducir la carga de trabajo en un 50%**

*El objetivo del mismo es:*

-Brindar una plataforma para lograr un mejor control de stock; y un mejor acceso a la información, mediante una herramienta segura y de fácil manejo con el fin de obtener un aumento del 40% en las ventas. 

*Alcance de la aplicación:*

  - Gestionar el control de compras: dejar registrado qué tipo de mercadería se compró, la cantidad, el margen de ganancia.
  - Llevar a cabo el control de stock: mantener el control de mercadería ingresada de forma clara, para luego reponer la mercadería faltante con mayor eficiencia
  - Realizar un control de las ventas: registrar que se vende, el monto ingresado por el producto. 
  ___
  
  ***¡El único rol lo va a tener el dueño del negocio, por lo tanto, él tendrá acceso a todas las funciones del sistema!***
  
  ___
  
  ### Ruta 
  [Almacen Backend](https://almacenbackend.com "Haz click aquí")
  
  ___
  
  ## Todas las rutas, (excepto/login), deben recibir el siguiente encabezado
  
  ### Encabezado
 ~~~
Json
[
    {
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYXF1aUBnbWFpbC5jb20iLCJub21icmUiOiJqb2FxdWkiLCJmZWNoYSI6IjIwMTktMTAtMjhUMjM6MjA6MTIuMjUyWiIsIm
    lhdCI6MTU3MjMwNDgxMn0.l6AFo7UirafIo0ubkITm52adlw615mh4RwNMdObTHmM"
    }
]  
  ~~~
  
  ## Iniciar Sesión
  
  - #### Post/login

 Devuelve token de autenticación requerido para el resto de solicitudes

*Cuerpo de solicitud*

~~~

Json
[
    {
    “Nombre”: “Joaquín”,
    “Mail”:joaquin@gmail.com,
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
    “Token”:”eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYXF1aUBnbWFpbC5jb20iLCJub21icmUiOiJqb2FxdWkiLCJmZWNoYSI6IjIwMTktMTAtMjhUMjM6MjA6MTIuMjU
            yWiIsImlhdCI6MTU3MjMwNDgxMn0.l6AFo7UirafIo0ubkITm52adlw615mh4RwNMdObTHmM “
    }
]
~~~

## Producto

- #### Post/producto/crear

Agrega un nuevo producto a la base de datos

*Cuerpo de solicitud*
~~~
Json
[
    {
    "Nombre":"" 
    "Cantidad":""
    "Marca":""
    "Precio":""
    "Código de barras":""
    }
 ]
  ~~~
*Formato de respuesta*
~~~
Json
[
    {
    “Mensaje”: “Producto agregado a la base de datos”
    }
]
~~~

- #### Get/producto/listar

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

- #### Delete/producto/borrar/:_id

Borramos el producto a través del id

*Parámetro de ruta*
~~~
:_id=524g245g45g52gg4
~~~
*Formato de respuesta*
~~~
 "Se borró correctamente”
~~~

- #### Get/producto/buscar

Devuelve uno o más productos según la propiedad de producto utilizada para buscar

*Formato de respuesta*
~~~
Json
[
    {
    “Id”:””,
    “Nombre”: “”,
    “Cantidad”:”3”,
    “Marca”:” ”
    “Precio”: “80”,
    “Código de barras”:””
    }
 ]
 ~~~
 
 - #### Put/producto/modificar/:_id
 
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

 - #### Post/venta/crear

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

 - #### Put/venta/insertar_producto/:_id

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

 - #### Get/venta/listar

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
    {
    “Nombre”: “”
    “Cantidad”:”3”,
    “Marca”: “”
    “Precio”:”80”,
    “Código de barras”:””
    }
~~~
 - #### Put/venta/sacarmonto/:_id

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

 - #### Delete/venta/borrar

Borra las ventas de la base de datos

*Formato de respuesta*
~~~
“Se borraron x venta/s”
~~~

 - #### Get/venta/buscar/:_id

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
    {
    “Nombre”: “”
    “Cantidad”:”3”,
    “Marca”: “”
    “Precio”:”80”,
    “Código de barras”:””
    }
~~~

## Compra

 - #### Post/compra/crear

Se crea una nueva compra y se la ingresa a la base de datos

*Formato de respuesta*
~~~
Json
[
    {
    “Mensaje”: “Compra agregada a la base de datos”,
    “id”:” hfberiufuifbpiub43kth4blk34jb3iy3o4y5oi345go345gui”
    }
]
~~~

 - #### Put/compra/insertar_producto/:_id

A la compra ya creada le ingresamos los productos que van a formar parte de esa compra

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
“Se ha agregado el objeto a la compra”
~~~

  - #### Get/compra/listar

Devuelve un listado de todas las compras existentes en la base de datos

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
*Productos de la compra*
~~~
    {
    “Nombre”: “”
    “Cantidad”:”3”,
    “Marca”: “”
    “Precio”:”80”,
    “Código de barras”:””
    }
~~~

 - #### Put/compra/sacarmonto/:_id

Calcula el monto total de la compra teniendo en cuenta el precio de cada uno de los productos que forman parte de la compra ya creada

*Parámetro de ruta*
~~~
:_id=23243456576jhg445h4
~~~
*Formato de respuesta*
~~~
Json
[
    {
    “Mensaje”: “Compra modificada y finalizada”,
    “Monto total”:”240”
    }
]
~~~

 - #### Delete/compra/borrar

Borra las compras de la base de datos

*Formato de respuesta*
~~~
“Se borraron x compra/s”
~~~

 - #### Get/venta/buscar/:_id

Nos permite obtener una compra a través del id

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
*Productos de la compra*
~~~
    {
    “Nombre”: “”
    “Cantidad”:”3”,
    “Marca”: “”
    “Precio”:”80”,
    “Código de barras”:””
    }
~~~

## Usuario

 - #### Post/usuario/crear

Nos permite crear un usuario con el cual vamos a poder utilizar las funciones del sistema

*Cuerpo de solicitud*
~~~
Json
[
    {
    “nombre”:” “,
    “Mail”:” “,
    “Clave”:” “
    }
]
~~~
*Formato de respuesta*
~~~
“Mensaje”: “Usuario agregado a la base de datos”
~~~

 - #### Get/usuario/listar

Devuelve un listado de todos los usuarios existentes en la base de datos

*Formato de respuesta*
~~~
Json 
[
    {
    “id”:””,
    “Nombre”: “ ”,
    “Mail”: “ “,
    “Clave”:” “
    }
]
~~~

 - #### Delete/usuario/borrar/:_id

Borramos el usuario a través del id

*Parámetro de ruta*
~~~
:_id=524g245g45g52gg4
~~~
*Formato de respuesta*
~~~
"Se borró correctamente el usuario"
~~~

 - #### Get /usuario/buscar

Devuelve uno o más usuarios según la propiedad de producto utilizada para buscar

*Formato de respuesta*
~~~
Json
[
    {
    “id”:””,
    “Nombre”: “”,
    “Mail”:””,
    “Clave”:” ”
    }
]
~~~

 - #### Put /usuario/modificar/:_id

Se modifica una o más propiedades del usuario según se desee

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
    “Mail”:””,
    “Clave”:””
    }
]
~~~

## Remito

 - #### Post/remito/crear

Permite crear un remito para cada compra realizada

*Cuerpo de solicitud*
~~~
Json
[
    {
    “Numero de remito”:” “,
    “Id proveedor”:“ “,
    “Id compra”:” “
    }
]
~~~
*Formato de respuesta*
~~~
“Mensaje: Remito agregado a la base de datos”
~~~

 - #### Get/remito/listar

Devuelve el listado de todos los remitos existentes en la base de datos

*Formato de respuesta*
~~~
Json
[
    {
    “Id”:” “,
    “Fecha”:” “,
    “Numero de remito”:” “,
    }
]
~~~
*Productos de la compra:*
~~~
    {
    “Nombre”:” “,
    “Cantidad”:” “,
    “Marca”:” “,
    “Código de barras”:” “
    }
~~~
*Proveedor:*
~~~
    {
    “Razón social”:” “,
    “Cuil”:” “,
    “Número de teléfono”:“ “
    }
~~~
*Formato de respuesta*
~~~
“Mensaje”: “Se modificó correctamente el usuario”
~~~

 - #### Delete/remito/borrar

Permite borrar los remitos de la base de datos

*Formato de respuesta*
~~~
“Mensaje”: Se borraron correctamente x remito/s”
~~~

## Proveedor

 - #### Post/proveedor/crear

Nos permite agregar un proveedor a la base de datos

*Cuerpo de solicitud*
~~~
 Json
[
    {
    “Razón social”:” “,
    “Cuil”:” “,
    “Número de teléfono”:” “
    }
 ]
 ~~~
 *Formato de respuesta*
 ~~~
 “Mensaje”: “Proveedor agregado a la base de datos”
 ~~~
 
 - #### Get/proveedor/listar

Devuelve un listado de todos los proveedores existentes en la base de datos

*Formato de respuesta*
~~~
Json
[
    {
    “id”:””,
    “Razón social”: “ ”,
    “Cuil”: “ “,
    “Número de teléfono”:” “,
    “Monto a favor”:” “
    }
]
~~~

 - #### Delete/proveedor/borrar/:_id

Borramos el proveedor a través del id

*Parámetro de ruta*
~~~
:_id=524g245g45g52gg4
~~~
*Formato de respuesta*
~~~
 "Se borró correctamente el proveedor”
~~~


 - #### Get/proveedor/buscar

Devuelve uno o más proveedores según la propiedad de producto utilizada para buscar

*Formato de respuesta*
~~~
Json
[
    {
    “id”:””,
    “Razón social”: “”,
    “Cuil”:””,
    “Número de teléfono”:” ”,
    “Monto a favor”:” “
    }
]
~~~

 - #### Put/proveedor/modificar/:_id

Se modifica una o más propiedades del proveedor según se desee

*Parámetro de ruta*
~~~
:_id=122345667jrthegf3r24t
~~~
*Cuerpo de solicitud*
~~~
Json
[
    {
    “Razón social”: “”,
    “Cuil”:””,
    “Número de teléfono”:” ”,
    “Monto a favor”:” “
    }
 ]
 ~~~
*Formato de respuesta*
~~~
“Mensaje”: “Se modificó correctamente el proveedor”
~~~

## Factura de compra

 - #### Post/facturacompra/crear

Permite crear una factura de cada compra realizada

*Cuerpo de solicitud*
~~~
Json
[
    {
    “Numero de factura”:” “,
    “Id de compra”:” “,
    “Tipo de factura”:” “,
    “Tipo de IVA”:” “
    }
 ]
 ~~~
*Formato de respuesta*
~~~
“Mensaje”: “Factura agregada a la base de datos”
~~~

 - #### Get/facturacompra/listar

Devuelve un listado de todas las facturas existentes en la base de datos

*Formato de respuesta*
~~~
Json
[
    {
    “Id”:” “,
    “Fecha”:” “,
    “Número de factura”:” “,
    }
 ~~~
*Compra:*
~~~
    {
    “Fecha”:” “,
    “Monto total”:” “,
    }
 ~~~
 *Productos de la compra:*
~~~
    {
    “Nombre”:” “,
    “Cantidad”:” “,
    “Marca”:” “,
    “Precio”:” “,
    “Código de barras”
    }
 ~~~
 *Proveedor:*
~~~
    {
    “Razón social”:” “,
    “Cuil”:” “,
    “Número de teléfono”:” “
    }
      {
      “Tipo de factura”:” “,
      “Tipo de IVA”:” “,
      “Monto con IVA”
      }
]
~~~

 - #### Delete/facturacompra/borrar

Permite borrar las facturas existentes en la base de datos

*Formato de respuesta*
~~~
“Mensaje”: “Se borró correctamente x factura/s”
~~~

## Factura de venta

 - #### Post/facturaventa/crear

Permite crear una factura de cada venta realizada

*Cuerpo de solicitud*
~~~
Json
[
    {
    “Numero de factura”:” “,
    “Id de compra”:” “,
    “Tipo de factura”:” “,
    “Tipo de IVA”:” “,
    “Cliente”:” “
    }
]
~~~
*Formato de respuesta*
~~~
“Mensaje”: “Factura agregada a la base de datos”
~~~

 - #### Get/facturaventa/listar

Devuelve un listado de todas las facturas existentes en la base de datos

*Formato de respuesta *
~~~
Json
[
    {
    “Id”:” “,
    “Fecha”:” “,
    “Número de factura”:” “,
    }
~~~
*Venta:*
~~~
    {
    “Fecha”:” “,
    “Monto total”:” “,
    }
~~~
*Productos de la venta:*
~~~
    {
    “Nombre”:” “,
    “Cantidad”:” “,
    “Marca”:” “,
    “Precio”:” “,
    “Código de barras”
    }
     {
     “Cliente”:” “,
     “Tipo de factura”:” “,
     “Tipo de IVA”:” “,
     “Monto con IVA”
     }
]
~~~


 - #### Delete/facturaventa/borrar

Permite borras las facturas existentes en la base de datos

*Formato de respuesta*
~~~
“Mensaje”: “Se borró correctamente x factura/s”
~~~
