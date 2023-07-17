require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => {
  console.log(err);
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});

let Person;
Person = mongoose.model('Person', personSchema);
const peopleArray = Array.from(Array(3).keys()).map((x) => ({
  name: `John${x}`,
  age: x * 10,
  favoriteFoods: [`Steak${x}`, `Potatoes${x}`],
}));

const createAndSavePerson = (done) => {
  const person = new Person();
  person.name = 'John';
  person.age = '38';
  person.favoriteFoods = ['bread', 'fish'];
  person.save((err, data) => {
    if (err) return done(err);
    done(null, person);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne(
    { favoriteFoods: food },
    (err, data) => {
      if (err) return console.log(err);
      done(null, data);
    },
  );
};

const findPersonById = (personId, done) => {
  Person.findOne(
    { _id: personId },
    (err, data) => {
      if (err) return console.log(err);
      done(null, data);
    },
  );
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);
    person.markModified('favoriteFoods');
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, (err, updatedPerson) => {
    if (err) return console.log(err);
    done(null, updatedPerson);
  }, { new: true });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = 'Mary';
  Person.deleteMany({ name: nameToRemove }, (err, result) => {
    if (err) return console.log(err);
    done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = 'burrito';
  Person.find({ favoriteFoods: foodToSearch }).sort({ name: 1 }).limit(2).select({ name: true, favoriteFoods: true })
    .exec((err, result) => {
      if (err) return console.log(err);
      done(null, result);
    });
};

/** **Well Done !!**
 * You completed these challenges, let's go celebrate !
 */

// ----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
