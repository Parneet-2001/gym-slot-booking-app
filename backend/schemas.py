from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class Login(BaseModel):
    email: str
    password: str


class SlotCreate(BaseModel):
    time: str
    capacity: int


class BookingCreate(BaseModel):
    slot_id: int


class AttendanceCreate(BaseModel):
    user_id: int
    slot_id: int
