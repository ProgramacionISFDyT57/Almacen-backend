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
  
  ##Todas las ruta, (excepto/login), deben recibir el siguiente encabezado
  
  #### Encabezado
  
  ```json
  
  {
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYXF1aUBnbWFpbC5jb20iLCJub21icmUiOiJqb2FxdWkiLCJmZWNoYSI6IjIwMTktMTAtMjhUMjM6MjA6MTIuMjUyWiIsImlhdCI6MTU3MjMwNDgxMn0.l6AFo7UirafIo0ubkITm52adlw615mh4RwNMdObTHmM"
  }
  
  ```
  
  ## Login
  
  #### Post/login

 Devuelve token de autenticación requerido para el resto de solicitudes


