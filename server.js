const express = require("express");
const morgan = require("morgan");
const path = require("path")

const app = express();
let productos = [
  {
    id: "1",
    name: "laptop",
    price: 3000,
  }
];

app.use(morgan("dev"));
app.use(express.json());

app.set('appname','ExpressCurso')
app.set('port',3000)

app.get('/productos',(req,res)=>{
    res.json(productos)    
})

app.post('/productos',(req,res)=>{
    const newproducto = {...req.body, id:productos.length + 1}
    productos.push(newproducto)
    res.send(newproducto)
    
})

app.put("/productos/:id", (req, res) => {

    const newdata = req.body
    const productfound = productos.find(
        (producto) => producto.id === req.params.id);

    if (!productfound)
      return res.status(404).json({
        messege: "no se ha encontrado el producto",
      });

    productos = productos.map(p=> p.id === parseInt(req.params.id)?{...p, ...newdata} :p)
    res.json({"messege":"producto actualizado satisfactoriamente"})
  
});

app.delete("/productos/:id", (req, res) => {
  const productfound = productos.find((p) => p.id === parseInt(req.params.id));

  if (!productfound)
    return res.status(404).json({
      messege: "no se ha encontrado el producto",
    });

  productos = productos.filter((p) => p.id !== parseInt(req.params.id));
    res.status(404);

});

app.patch("/productos", (req, res) => {
  res.send("? productos");
});

app.get("/productos/:id", (req, res) => {
  const productfound = productos.find((p) => p.id === req.params.id);

  if (!productfound) {
    res.status(404).json({
      messege: "no se ha encontrado el producto",
    });
  }
  res.send(productfound);
  console.log(productfound);
});

app.listen(app.get('port'));
console.log(`server${app.get('appname')} on port ${app.get('port')}`);
