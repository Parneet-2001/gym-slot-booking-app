from fastapi import FastAPI, Depends, HTTPException, Header
from sqlalchemy.orm import Session
import models, schemas
from database import engine, SessionLocal
from auth import hash_password, verify_password, create_token
from jose import jwt

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -------- AUTH HELPERS --------
SECRET_KEY = "secret123"
ALGORITHM = "HS256"

def get_current_user(token: str = Header(...), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = db.query(models.User).filter(models.User.id == payload["user_id"]).first()
        return user
    except:
        raise HTTPException(status_code=401, detail="Invalid token")


def admin_only(user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    return user


# -------- AUTH APIs --------
@app.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )
    db.add(db_user)
    db.commit()
    return {"message": "User created"}


@app.post("/login")
def login(data: schemas.Login, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()

    if not user or not verify_password(data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_token({"user_id": user.id, "role": user.role})
    return {"token": token}


# -------- SLOT APIs --------
@app.post("/slots")
def create_slot(slot: schemas.SlotCreate, db: Session = Depends(get_db), user=Depends(admin_only)):
    db_slot = models.Slot(time=slot.time, capacity=slot.capacity)
    db.add(db_slot)
    db.commit()
    return {"message": "Slot created"}


@app.get("/slots")
def get_slots(db: Session = Depends(get_db)):
    return db.query(models.Slot).all()


# -------- BOOKING APIs --------
@app.post("/book")
def book_slot(booking: schemas.BookingCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    db_booking = models.Booking(user_id=user.id, slot_id=booking.slot_id)
    db.add(db_booking)
    db.commit()
    return {"message": "Slot booked"}


@app.get("/bookings")
def get_bookings(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(models.Booking).filter(models.Booking.user_id == user.id).all()


@app.delete("/booking/{id}")
def cancel_booking(id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    booking = db.query(models.Booking).filter(models.Booking.id == id).first()
    db.delete(booking)
    db.commit()
    return {"message": "Cancelled"}


# -------- ATTENDANCE API --------
@app.post("/attendance")
def mark_attendance(att: schemas.AttendanceCreate, db: Session = Depends(get_db), user=Depends(admin_only)):
    record = models.Attendance(user_id=att.user_id, slot_id=att.slot_id)
    db.add(record)
    db.commit()
    return {"message": "Attendance marked"}
