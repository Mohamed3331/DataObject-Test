
const express = require('express')
const sequelize = require('./pg')

const DataObject = require('./models/objectModel')
const Level = require('./models/levelModel')
const Element = require('./models/elementModel')

const port = process.env.PORT || 5000;

const app = express()
app.use(express.json());

(async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Database Connected Successfully.')
    } catch (e) {
        console.log(e);
        sequelize.close()

    }
})()

DataObject.hasMany(Level)
Level.belongsTo(DataObject)

Level.hasMany(Element)
Element.belongsTo(Level)

// @route   POST /dataObject
app.post('/dataObject', async (req, res) => {
    try {
        const newobj = await DataObject.create({ name: req.body.name })

        // iterate through levels to add FK property and same goes to each element 
        const levels = req.body.levels.map((level) => {
            level.elements.forEach(async (ele) => {
                await Element.create({ ...ele, LevelId: level.levelID })
            })
            return { ...level, DataObjectId: newobj.id }
        })


        await Level.bulkCreate(levels)
        return res.send({ message: `Created DataObject` })
    } catch (e) {
        return res.send({ error: e.message ?? 'Error' })
    }
})

// @route   GET /dataObject/1
app.get('/dataObject/:id', async (req, res) => {
    try {
        const id = req.params.id
        const obj = await DataObject.findByPk(id, {
            include: {
                model: Level,
                include: {
                    model: Element,
                }
            }
        });

        if (!obj || !id) throw new Error("Something Went Wrong")

        return res.send(obj.toJSON())
    } catch (e) {
        return res.send({ error: e.message ?? 'Error' })
    }
})

// @route   DELETE /dataObject/1
app.delete('/dataObject/:id', async (req, res) => {
    try {
        const id = req.params.id
        await DataObject.destroy({
            where: {
                id
            }
        });

        if (!id) throw new Error("Something Went Wrong")

        return res.send({ message: `Deleted DataObject ${id}` })
    } catch (e) {
        return res.send({ error: e.message ?? 'Error' })
    }
})

// @route   GET /dataObject
app.get('/dataObject', async (req, res) => {
    try {
        const obj = await DataObject.findAll({
            include: {
                model: Level,
                include: {
                    model: Element,
                }
            }
        });

        if (!obj) throw new Error("Something Went Wrong")

        const objs = obj.map(o => o.toJSON())
        return res.send(objs)
    } catch (e) {
        return res.send({ error: e.message ?? 'Error' })
    }
})

app.listen(port, function () {
    console.log(`Server listening on port ${port}`)
})