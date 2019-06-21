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
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as gatewayConfigurationActions from '../gateway-configuration.actions';
import {emptySearchResult, SearchResult} from '../../../common/store/search.reducer';
import {skip, takeUntil, catchError, switchMap, map, debounceTime} from 'rxjs/operators';
import {ConfigurationPage} from "../../../services/notifications/domain/configuration-page.model";
import {NotificationsService} from "../../../services/notifications/notifications.service";

@Injectable()
export class NotificationsSearchApiEffects {

  @Effect()
  search$: Observable<Action> = this.actions$
    .pipe(ofType(gatewayConfigurationActions.SEARCH),
    debounceTime(300),
    map((action: gatewayConfigurationActions.SearchAction) => action.payload),
    switchMap(fetchRequest => {
      const nextSearch$ = this.actions$.pipe(ofType(gatewayConfigurationActions.SEARCH),(skip(1)));

      return this.notificationsService.findSmsConfiguration(fetchRequest).pipe(
        takeUntil(nextSearch$),
        map(this.mapToSearchResult),
        map(searchResult => new gatewayConfigurationActions.SearchCompleteAction(searchResult)),
        catchError(() => of(new gatewayConfigurationActions.SearchCompleteAction(emptySearchResult()))),);
    }),);

  @Effect()
  searchByState$: Observable<Action> = this.actions$
    .pipe(ofType(gatewayConfigurationActions.SEARCH_BY_STATE),
    debounceTime(300),
    map((action: gatewayConfigurationActions.SearchByConfigurationStateAction) => action.payload),
    switchMap(payload => {
      const nextSearch$ = this.actions$.pipe(ofType(gatewayConfigurationActions.SEARCH_BY_STATE),(skip(1)));

      return this.notificationsService.findSmsConfiguration(payload.identifier, payload.fetchRequest).pipe(
        takeUntil(nextSearch$),
        map(this.mapToSearchResult),
        map(searchResult => new gatewayConfigurationActions.SearchCompleteAction(searchResult)),
        catchError(() => of(new gatewayConfigurationActions.SearchCompleteAction(emptySearchResult()))),);
    }),);

  private mapToSearchResult(configurationPage: ConfigurationPage): SearchResult {
    return {
      elements: configurationPage.configurations,
      totalElements: configurationPage.totalElements,
      totalPages: configurationPage.totalPages
    };
  }

  constructor(private actions$: Actions, private notificationsService: NotificationsService) { }

}
