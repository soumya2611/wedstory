# Live Wedding Invitation Backend Server

This is the production Node/Express backend that persists your wedding configuration in **MongoDB** and hosts uploaded photos and music files in **Cloudinary**.

---

## 1. Prerequisites (Setup free database & storage)

### Step A: Get a free MongoDB Database (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2. Create a new Shared Cluster (Free Tier) in any region.
3. In **Database Access**, create a user with a username and password (keep these safe).
4. In **Network Access**, click **Add IP Address** and choose **Allow Access from Anywhere** (`0.0.0.0/0`) so that your Render/Railway server can connect to it.
5. In **Clusters**, click **Connect** -> **Drivers** -> Copy your Connection String. It will look like:
   `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   *(Replace `<username>` and `<password>` with the database user credentials you created).*

### Step B: Get free Cloudinary Storage (for images and audio)
1. Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account.
2. In your Dashboard, copy the following three credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

---

## 2. Deploy the Backend to Render.com (Free)

1. Go to [Render](https://render.com/) and sign up with your GitHub account.
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository (e.g. `soumya2611/wedstory`).
4. Configure the Web Service settings:
   - **Name**: `wedstory-backend`
   - **Language**: `Node`
   - **Root Directory**: `server` *(Important: point this to the `server` folder so Render installs and runs the backend instead of the frontend).*
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`
5. In **Environment Variables**, add the following keys:
   - `MONGODB_URI` = `your_mongodb_connection_string` (from Step A)
   - `CLOUDINARY_CLOUD_NAME` = `your_cloudinary_cloud_name` (from Step B)
   - `CLOUDINARY_API_KEY` = `your_cloudinary_api_key` (from Step B)
   - `CLOUDINARY_API_SECRET` = `your_cloudinary_api_secret` (from Step B)
6. Click **Deploy Web Service**. Render will install your packages, connect to MongoDB, and automatically seed the database with your initial config.

*Once deployed, copy your Render Web Service URL (e.g., `https://wedstory-backend.onrender.com`).*

---

## 3. Connect Vercel Frontend to the Backend

To tell your live Vercel frontend to talk to your live backend:

1. Go to your **Vercel Dashboard** and select your project (`wedstory`).
2. Go to **Settings** -> **Environment Variables**.
3. Add a new variable:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://your-render-backend-url.onrender.com` *(Paste your Render Web Service URL without a trailing slash).*
4. Re-trigger a build on Vercel (or push a small commit to GitHub) to apply the variable.

Now, your live wedding invitation will fetch its settings directly from MongoDB and upload all admin files to Cloudinary!
