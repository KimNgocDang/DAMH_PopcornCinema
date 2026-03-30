# Database Scripts Documentation

This document describes the available database scripts for the Popcorn Cinema project.

## Overview

These scripts manage database initialization, seeding, and reset operations for the MongoDB database used by the Popcorn Cinema backend.

## Available Scripts

### From Root Directory

Run these commands from the project root:

#### `npm run db:generate`

Initializes the database with fresh seed data.

**What it does:**
- Connects to MongoDB
- Clears existing collections (safe for fresh starts)
- Creates and populates core entities:
  - 3 Cinemas
  - 6 Movies
  - 9 Auditoriums
  - 1,080 Seats
  - 45 Showtimes
  - 4 Users

**Usage:**
```bash
npm run db:generate
```

**Expected output:**
```
✅ Data seeding completed successfully!
Summary:
- Cinemas: 3
- Movies: 6
- Auditoriums: 9
- Seats: 1080
- Showtimes: 45
- Users: 4
```

---

#### `npm run db:reset`

Resets the database and reseeds it with clean data. Useful for development and testing.

**What it does:**
- Connects to MongoDB
- Clears all collections (including BookingCombos, PaymentTransactions, etc.)
- Repopulates with fresh seed data
- Ensures indices are properly created

**Usage:**
```bash
npm run db:reset
```

**Expected output:**
```
✅ Data seeding completed successfully!
Summary:
- Cinemas: 3
- Movies: 6
- Auditoriums: 9
- Seats: 1080
- Showtimes: 45
- Users: 4
```

---

### From Server Directory

You can also run these commands directly from the `server` directory:

```bash
cd server
npm run db:generate    # Initialize database
npm run db:reset       # Reset database
```

---

## Schema Collections

The following MongoDB collections are managed by these scripts:

### Core Entities
- **Cinemas** - Movie theater locations
- **Movies** - Film information
- **Auditoriums** - Theater halls/rooms
- **Seats** - Individual seat definitions
- **Showtimes** - Movie showtimes
- **Users** - System users (admin, customers)

### Relationship Collections
- **MovieActors** - Actor-Movie relationships
- **MovieGenres** - Genre-Movie relationships
- **BookingCombos** - Booking-Combo relationships
- **Actors** - Actor information
- **Genres** - Genre definitions
- **Combos** - Snack/Food bundles

### Transaction Collections
- **PaymentTransactions** - Payment transaction records

---

## Configuration

The scripts require a `.env` file in the `server` directory with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/cinema_booking
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

**Key variables:**
- `MONGO_URI` - MongoDB connection string (required)
- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - JWT signing secret
- `NODE_ENV` - Environment (development/production)

---

## Seed Data Details

### Cinemas
- Popcorn Cinema Thủ Đức
- Popcorn Cinema Bình Thạnh
- Popcorn Cinema Quận 1

### Movies
- Avengers: Endgame (Action, Sci-Fi)
- The Shawshank Redemption (Drama, Crime)
- Inception (Action, Sci-Fi, Thriller)
- The Dark Knight (Action, Crime, Drama)
- Interstellar (Adventure, Drama, Sci-Fi)
- Dune (Action, Adventure, Drama, Sci-Fi)

### Auditoriums
- 3 auditoriums per cinema (9 total)
- Each auditorium: 10 rows × 12 columns
- Seat capacity: 120 seats per auditorium

### Seats
- Types: VIP (first 6 columns) and COUPLE (remaining columns)
- VIP extra price: 50,000 VND
- COUPLE extra price: 30,000 VND

### Showtimes
- 45 showtimes across multiple cinemas and movies
- Show times: 9am, 12pm, 3pm, 6pm, 9pm
- Base prices: 100,000 - 150,000 VND

### Users
1. **User ID 1** - Tran Dung (Customer)
2. **User ID 2** - Nguyen Thi Lan (Customer)
3. **User ID 3** - Admin (Admin)
4. **User ID 4** - User A (Customer)

---

## Workflow Examples

### Fresh Start / Development Reset
```bash
npm run db:reset
npm run dev
```

### Initial Setup
```bash
npm install
npm run db:generate
npm run dev:server
```

### Testing Database Operations
```bash
npm run db:reset  # Clean state for testing
npm run testdb    # Run test-db.ts
```

---

## Troubleshooting

### MongoDB Connection Error
**Error:** `MONGO_URI is missing in .env`

**Solution:** Ensure `.env` file exists in the `server` directory with a valid `MONGO_URI`

```bash
cd server
# Create or update .env with MONGO_URI
```

### Port Already in Use
**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:** Either:
- Kill the process using port 5000
- Change the PORT in `.env`

### Database Connection Timeout
**Error:** `MongoNetworkError: connection refused`

**Solution:**
- Ensure MongoDB is running: `mongod --version`
- Verify connection string in `.env`
- Start MongoDB service if needed

---

## Additional Commands

### Seed Only (from server directory)
```bash
npm run seed
```

### Test Database Connection (from server directory)
```bash
npm run testdb
```

### Development Server (from root)
```bash
npm run dev:server
```

---

## Notes

- Scripts use **Mongoose** for MongoDB ORM
- All timestamps use MongoDB's native datetime format
- Unique indices are created automatically for:
  - Actor names
  - Cinema locations
  - Email addresses
  - Order codes

---

## Support

For issues or questions about the database scripts, refer to:
- [server/seed.ts](../server/seed.ts) - Seed implementation
- [server/config/db.ts](../server/config/db.ts) - Database configuration
- [server/schemas/](../server/schemas/) - Schema definitions
