const modelOption = {
     toJSON: {
          virtuals: true, 
          transform: (_, obj) => {
               delete obj.id
          }
     }
}