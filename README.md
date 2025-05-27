# My Timeline

A beautiful, chronological display of life events, inspired by Buster Benson's "Life in Weeks".

![Timeline Logo](./logo.webp)

## Features

- Display a chronological timeline of life events
- Add, edit, and delete events through an easy-to-use dashboard
- Support for Markdown formatting in event descriptions
- Image upload capability for adding photos to events
- Birthday markers to track anniversaries
- Responsive design that works on all devices

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or pnpm

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd timeline
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open your browser and visit `http://localhost:5173` to see your timeline

## Using the Dashboard

This project includes an admin dashboard to easily manage your timeline events without editing code files directly.

1. Access the dashboard by clicking the "Timeline Admin" button in the header
2. Login with the default credentials:
   - Username: `admin`
   - Password: `password123`
3. You'll now see the admin dashboard where you can:
   - Add new events
   - Edit existing events
   - Delete events
   - Sort events by date
   - Upload and add images to your event descriptions

### Adding Events

1. Click the "Add New Event" button
2. Fill in the event details:
   - **Date**: In YYYY-MM-DD format (required)
   - **Event Name**: A short title for the event (required)
   - **Description**: Optional longer description with Markdown support
   - **Birthday**: Check this box for one special event to generate yearly markers

### Adding Images to Events

1. While editing an event, click the "Add Image" button
2. Select an image file from your computer
3. Once uploaded, the image will appear in the uploaded images section
4. Click "Insert" to add the image to your description at the cursor position

### Markdown Support

Event descriptions support Markdown syntax for rich formatting:

- `**Bold text**` → **Bold text**
- `*Italic text*` → *Italic text*
- `[Link text](https://example.com)` → [Link text](https://example.com)
- `![Image alt text](/image.jpg)` → Displays an image

## Customization

You can customize the appearance of your timeline by editing the CSS variables in `src/routes/+layout.svelte`:

```svelte
:global(html, body) {
  --color-bg: #fff4f4;
  --color-bg-fade: #fff4f4ee;
  --color-text: #333;
  --color-life: #888;
  --color-future: #ddd;
  --color-link: rgb(253, 71, 11);
}
```

## Deployment

This project can be deployed to Firebase for hosting, database, storage, and authentication:

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)
2. Enable Authentication, Firestore, and Storage
3. Add the Firebase configuration to `src/lib/firebase.ts`
4. Install Firebase CLI: `npm install -g firebase-tools`
5. Login to Firebase: `firebase login`
6. Initialize Firebase: `firebase init`
   - Select Hosting, Firestore, and Storage
   - Use an existing project (select your Firebase project)
   - Specify public directory: `.svelte-kit/output/client`
   - Configure as a single-page app: Yes
7. Deploy: `firebase deploy`

### Security Rules

Set up Firebase security rules for Firestore and Storage to protect your data.

## Security Note

The current authentication is intentionally simple for demonstration purposes. For a production environment, you should implement proper authentication and authorization.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Buster Benson's [Life in Weeks](https://busterbenson.com/life-in-weeks)
- Built with SvelteKit, a powerful web framework

