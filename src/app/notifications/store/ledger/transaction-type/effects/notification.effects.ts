/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as transactionTypeActions from '../transaction-type.actions';
import { NotificationService, NotificationType } from '../../../../../services/notification/notification.service';
import { tap } from 'rxjs/operators'

@Injectable()
export class TransactionTypeNotificationEffects {

  @Effect({ dispatch: false })
  createTransactionTypeSuccess$: Observable<Action> = this.actions$
    .pipe(ofType(transactionTypeActions.CREATE_SUCCESS),
      tap(() => this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Transaction type is going to be created'
      })));

  @Effect({ dispatch: false })
  updateTransactionTypeSuccess$: Observable<Action> = this.actions$
    .pipe(ofType(transactionTypeActions.UPDATE_SUCCESS),
      tap(() => this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Transaction type is going to be updated'
      })));

  constructor(private actions$: Actions, private notificationService: NotificationService) { }
}
