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
import {Store} from '@ngrx/store';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import * as fromAccounting from './store';
import {Observable, of} from 'rxjs';
import {LoadAction} from './store/ledger/ledger.actions';
import {AccountingService} from '../services/accounting/accounting.service';
import {ExistsGuardService} from '../common/guards/exists-guard';
import {switchMap, map, tap} from 'rxjs/operators';
import {NotificationsService} from "../services/notifications/notifications.service";

@Injectable()
export class SmsConfigurationExistsGuard implements CanActivate {

  constructor(private store: Store<fromAccounting.State>,
              private notificationsService: NotificationsService,
              private existsGuardService: ExistsGuardService) {}

  hasSmsConfigurationInStore(id: string): Observable<boolean> {
    const timestamp$ = this.store.select(fromAccounting.getLedgersLoadedAt).pipe(
      map(loadedAt => loadedAt[id]));

    return this.existsGuardService.isWithinExpiry(timestamp$);
  }

  hasSmsConfigurationInApi(id: string): Observable<boolean> {
    const findSmsConfiguration$ = this.notificationsService.findSmsConfiguration(id).pipe(
      map(ledgerEntity => new LoadAction(ledgerEntity)),
      tap((action: LoadAction) => this.store.dispatch(action)),
      map(ledger => !!ledger));

    return this.existsGuardService.routeTo404OnError(findSmsConfiguration$);
  }

  hasSmsConfiguration(id: string): Observable<boolean> {
    return this.hasSmsConfigurationInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasSmsConfigurationInApi(id);
      }));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.hasSmsConfiguration(route.params['id']);
  }
}
