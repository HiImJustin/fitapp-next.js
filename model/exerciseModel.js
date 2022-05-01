const db = require('../lib/db')

module.exports.addExercise = ( exerciseName, avgCalBurned) => (
    db.query('Insert into exercises(exerciseName, avgCalBurned)'
    + 'Values(?,?)', [exerciseName, avgCalBurned])
)

module.exports.getExercise = () => (
    db.query('Select * from exercises')
)