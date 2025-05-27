import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { storage } from '$lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function POST({ request }: RequestEvent) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        
        if (!file) {
            return json({ error: 'No file uploaded' }, { status: 400 });
        }
        
        // Check if it's an image
        if (!file.type.startsWith('image/')) {
            return json({ error: 'Only image files are allowed' }, { status: 400 });
        }
        
        // Get file extension
        const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
        
        // Create a unique filename
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;
        
        // Create a reference to the file in Firebase Storage
        const storageRef = ref(storage, `images/${fileName}`);
        
        // Upload the file to Firebase Storage
        const arrayBuffer = await file.arrayBuffer();
        await uploadBytes(storageRef, arrayBuffer);
        
        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
        
        // Return the file path
        return json({ 
            success: true, 
            filePath: downloadURL,
            fileName: fileName
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return json({ error: 'Error uploading file' }, { status: 500 });
    }
}; 