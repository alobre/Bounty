export const constraints = {
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
