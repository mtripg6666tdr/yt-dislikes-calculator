class _sessionManager {
  private sessions = [] as string[];

  addEntry(sid:string){
    if(!this.sessions.includes(sid)){
      this.sessions.push(sid);
    }
  }

  exists(sid:string):boolean{
    return this.sessions.includes(sid);
  }

  delEntry(sid:string){
    if(this.sessions.includes(sid)){
      this.sessions.splice(this.sessions.findIndex(s => s === sid), 1);
    }
  }
}

export const SessionManager = new _sessionManager();