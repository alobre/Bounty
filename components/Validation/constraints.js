export const constraintsTask = {
    title: {
      presence: true,
      length: {
        minimum: 4,
        maximum: 20,
        tooShort: "Titel muss mindestens 4 Zeichen enthalten",
        tooLong: "Titel darf maximal 20 Zeichen enthalten",
      }
    },
    tags:{
        presence: true,
        length:{
            minimum: 1,
            maximum: 3,
            tooShort:"Mindestens ein Schlagwort notwendig",
            tooLong:"Maximal 3 Schlagwörter erlaubt"
        }
    }
  };

export const constraintsRegister = {
  email:{
    presence: true,
    email:{
      message: "Email ungültig"
    }
  },
  password:{
    presence: true,
    length:{
      minimum: 8,
      tooShort: "Passwort muss mindestens 8 Stellen enthalten"
    }
  }
}
