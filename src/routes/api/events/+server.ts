import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import type { YMLDay } from '../../types';
import { db } from '$lib/firebase';
import { 
    collection, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    query, 
    where, 
    orderBy 
} from 'firebase/firestore';

// Collection reference
const eventsCollection = collection(db, 'events');

// GET handler - retrieve all events
export async function GET() {
    try {
        // Get all events from Firestore, ordered by date
        const querySnapshot = await getDocs(query(eventsCollection, orderBy('date')));
        
        // Format the data to match the YMLDay structure
        const events: YMLDay[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            events.push({
                [data.date]: {
                    name: data.name,
                    desc: data.desc,
                    birthday: data.birthday
                }
            });
        });
        
        return json(events);
    } catch (error) {
        console.error('Error getting events:', error);
        return json({ error: 'Failed to get events' }, { status: 500 });
    }
}

// POST handler - add a new event
export async function POST({ request }: RequestEvent) {
    try {
        const { event } = await request.json();
        if (!event) {
            return json({ error: 'Event data is required' }, { status: 400 });
        }
        
        // Extract date and event data
        const eventDate = Object.keys(event)[0];
        const eventData = event[eventDate];
        
        // Check if event with this date already exists
        const existingQuery = query(eventsCollection, where('date', '==', eventDate));
        const existingSnapshot = await getDocs(existingQuery);
        
        if (!existingSnapshot.empty) {
            return json({ error: 'An event with this date already exists' }, { status: 400 });
        }
        
        // Add the event to Firestore
        await addDoc(eventsCollection, {
            date: eventDate,
            name: eventData.name,
            desc: eventData.desc || null,
            birthday: eventData.birthday || false
        });
        
        return json({ success: true });
    } catch (error) {
        console.error('Error in POST handler:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT handler - update an existing event
export async function PUT({ request }: RequestEvent) {
    try {
        const { oldDate, newEvent } = await request.json();
        if (!oldDate || !newEvent) {
            return json({ error: 'Old date and new event data are required' }, { status: 400 });
        }
        
        // Extract new date and event data
        const newDate = Object.keys(newEvent)[0];
        const newEventData = newEvent[newDate];
        
        // Find the event document to update
        const eventQuery = query(eventsCollection, where('date', '==', oldDate));
        const querySnapshot = await getDocs(eventQuery);
        
        if (querySnapshot.empty) {
            return json({ error: 'Event not found' }, { status: 404 });
        }
        
        // Update the event
        const eventDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'events', eventDoc.id), {
            date: newDate,
            name: newEventData.name,
            desc: newEventData.desc || null,
            birthday: newEventData.birthday || false
        });
        
        return json({ success: true });
    } catch (error) {
        console.error('Error in PUT handler:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE handler - remove an event
export async function DELETE({ request }: RequestEvent) {
    try {
        const { date } = await request.json();
        if (!date) {
            return json({ error: 'Event date is required' }, { status: 400 });
        }
        
        // Find the event document to delete
        const eventQuery = query(eventsCollection, where('date', '==', date));
        const querySnapshot = await getDocs(eventQuery);
        
        if (querySnapshot.empty) {
            return json({ error: 'Event not found' }, { status: 404 });
        }
        
        // Delete the event
        const eventDoc = querySnapshot.docs[0];
        await deleteDoc(doc(db, 'events', eventDoc.id));
        
        return json({ success: true });
    } catch (error) {
        console.error('Error in DELETE handler:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}; 