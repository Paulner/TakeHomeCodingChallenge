import express, { Request, Response } from 'express';

const router = express.Router();
//console.log('User Route Test 1')
let users = [
  {
    name: 'Jorn',
    id: 0,
  },
  {
    name: 'Markus',
    id: 3,
  },
  {
    name: 'Andrew',
    id: 2,
  },
  {
    name: 'Ori',
    id: 4,
  },
  {
    name: 'Mike',
    id: 1,
  },
];

function sortUsers<T>(array: T[], sortField: keyof T): T[] {
  return array.sort((a, b) => {
    if (a[sortField] < b[sortField]) return -1;
    if (a[sortField] > b[sortField]) return 1;
    return 0;
  });
}
//console.log('User Route Test 2')

router.get('/', (req: Request, res: Response) => {
  const sortField = req.query.sort as keyof typeof users[0];
  
//console.log('User Route Test 3') 

  if (sortField) {
    try {
      users = sortUsers(users, sortField);
      //console.log('User Route users fetched!')
      res.json(users); // returns sorted array here.
      return; // ensure no further responses are sent after this.
    } catch (error) {
      console.error("Error sorting users:", error); // Log the error for debugging
      return res.status(400).send('Sort field is invalid');
    }
  }

  res.json(users); // Return the unsorted array if no sortField is provided.

});


export default router;

