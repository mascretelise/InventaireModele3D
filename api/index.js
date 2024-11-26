const port = 3000; 
const app = express();
app.listen(port, () => {
    console.log(`t'écoutes ?${port}`)
})

app.get('/modele/:id', (req,res)=> {
    const id = parseInt(req.params.id)
    const modele = modeles.find(modele => modele.id == id)

    if(!modele){
        res.status(404).send('Pas de modèle trouvé')
    }
    res.send(modele)
})