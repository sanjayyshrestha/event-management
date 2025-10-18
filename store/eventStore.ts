// import { getAllEvents } from '@/actions/event'
// import { Events } from '@/app/page';
// import {create} from 'zustand'

// type Event=Events[number]
// interface EventState {
//   events: Event[];
//   isLoading:boolean;
//   fetchAllEvents: () => Promise<void>;
// }

// export const useEventStore=create<EventState>((set,get)=>({
//   events:[],
//   isLoading:true,
//   fetchAllEvents:async()=>{
//     try {
//       set({isLoading:true})
//       const response=await getAllEvents()
//       console.log(response)
//       set({events:response})
//     } catch (error) {
//       console.log('Error fetching events : ',error)
//     }finally{
//        set({isLoading:false})
//     }
//   }
// }))