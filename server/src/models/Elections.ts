import mongoose from 'mongoose';

interface IList {
    id: number;
    name: string;
    color: string;
  }
  
interface IVoteCount {
    list: number;
    votes: number;
  }
  
interface IElection extends Document {
    id: number;
    name: string;
    count: IVoteCount[];
    date: Date;
    totalSeats: number;
    results: {
        list: number;
        seats: number;
      }[];
  }


const initialLists: IList[] = [
  { id: 1, name: "Lista 1", color: "red" },
  { id: 2, name: "Lista 2", color: "blue" },
  { id: 3, name: "Lista 3", color: "green" },
  { id: 4, name: "Lista 4", color: "yellow" },
  { id: 5, name: "Lista 5", color: "purple" },
  { id: 6, name: "Lista 6", color: "orange" },
  { id: 7, name: "Lista 7", color: "pink" },
  { id: 8, name: "Lista 8", color: "gray" },
  { id: 9, name: "Lista 9", color: "brown" },
  { id: 10, name: "Lista 10", color: "black" }
];


const electionSchema = new mongoose.Schema<IElection>({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  count: [{
    list: {
      type: Number,
      required: true
    },
    votes: {
      type: Number,
      default: 0
    }
  }],
  date: {
    type: Date,
    default: Date.now
  },
  totalSeats: {
    type: Number,
    required: true
  },
  results: [{
    list: {
      type: Number,
      required: true
    },
    seats: {
      type: Number,
      required: true
    }
  }]
});


electionSchema.pre('save', async function(next) {
  if (this.isNew && !this.id) {
    try {
      const lastElection = await ElectionModel.findOne({}, { id: 1 }).sort({ id: -1 });
      this.id = lastElection ? lastElection.id + 1 : 1;
      
      if (!this.count || this.count.length === 0) {
        this.count = initialLists.map(list => ({
          list: list.id,
          votes: 0
        }));
      }
    } catch (error: any) {
      return next(error as Error);
    }
  }
  next();
});


const ElectionModel = mongoose.model<IElection>('Election', electionSchema);

export { ElectionModel, initialLists, IList };