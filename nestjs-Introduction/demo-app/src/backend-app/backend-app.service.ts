/* eslint-disable prettier/prettier */
import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class BackendAppService {
     private userData = [
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
          { id: 3, name: 'Charlie' },
     ]

     getAllUserData() {
          return this.userData
     }
     getUserDataById(id: number) {
          const dataID = this.userData.find((s) => s.id === id)
          if (!dataID) throw new NotImplementedException("user is not found")
          return dataID
     }

}
