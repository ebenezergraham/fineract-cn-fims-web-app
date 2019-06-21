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
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Actions, Effect ,ofType} from '@ngrx/effects';
import * as accountEntryActions from '../entries.actions';
import { Injectable } from '@angular/core';
import { AccountingService } from '../../../../../services/accounting/accounting.service';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class AccountEntryApiEffects {

  @Effect()
  loadAccountEntries$: Observable<Action> = this.actions$
    .pipe(ofType(accountEntryActions.SEARCH),
      map((action: accountEntryActions.SearchAction) => action.payload),
      mergeMap(payload =>
        this.accountingService.fetchAccountEntries(payload.accountId, payload.startDate, payload.endDate, payload.fetchRequest).pipe(
          map(accountEntryPage => new accountEntryActions.SearchCompleteAction(accountEntryPage)),
          catchError(() => of(new accountEntryActions.SearchCompleteAction({
            accountEntries: [],
            totalPages: 0,
            totalElements: 0
          }))))
      ));

  constructor(private actions$: Actions, private accountingService: AccountingService) { }
}
