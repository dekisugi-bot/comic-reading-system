# main.py
from fastapi import FastAPI
from api import authentication, comics

app = FastAPI()

app.include_router(authentication.router, prefix='/authentication', tags=['authentication'])
app.include_router(comics.router, prefix='/comics', tags=['comics'])

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="192.168.0.39", port=8000)