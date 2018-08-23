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

import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {EffectsRunner, EffectsTestingModule} from '@ngrx/effects/testing';
import {NotificationSearchApiEffects} from './service.effects';
import {Observable} from 'rxjs/Observable';
import {NotificationService} from '../../../services/notifications/notification.service';
import {SearchAction, SearchCompleteAction} from '../notification.actions';
import {SMSPage} from '../../../services/notifications/domain/sms-page.model';
import {emptySearchResult} from '../../../common/store/search.reducer';

describe('Notification Search Api Effects', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        EffectsTestingModule
      ],
      providers: [
        NotificationSearchApiEffects,
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj('notificationService', ['fetchSMS'])
        }
      ]
    });

  });

  describe('search$', () => {

    function setup(params?: {searchSMSReturnValue: any}) {
      const notificationService = TestBed.get(NotificationService);
      if (params) {
        notificationService.fetchSMS.and.returnValue(params.searchSMSReturnValue);
      }

      return {
        runner: TestBed.get(EffectsRunner),
        notificationEffects: TestBed.get(NotificationSearchApiEffects)
      };
    }

    it('should return a new SearchCompleteAction with CustomerPage', fakeAsync(() => {
      const smsPage: SMSPage = {
        smsConfiguration: [
          { identifier: 'test', auth_token: "uhgfghji9876", account_sid: '87678987', sender_number: '378498733', state: "Active"}
        ],
        totalElements: 1,
        totalPages: 1
      };

      const { runner, notificationEffects } = setup({ searchSMSReturnValue: Observable.of(smsPage) });

      const expectedResult = new SearchCompleteAction({
        elements: smsPage.smsConfiguration,
        totalPages: smsPage.totalPages,
        totalElements: smsPage.totalElements
      });

      runner.queue(new SearchAction({}));

      let result = null;
      notificationEffects.search$.subscribe(_result => result = _result);

      tick(299);
      expect(result).toBe(null);
      tick(300);
      expect(result).toEqual(expectedResult);
    }));

    it('should return a new SearchCompleteAction, with an empty array, if customer service throws', fakeAsync(() => {
      const {runner, notificationEffects} = setup({searchSMSReturnValue: Observable.throw(new Error())});

      const expectedResult = new SearchCompleteAction(emptySearchResult());

      runner.queue(new SearchAction({}));

      let result = null;
      notificationEffects.search$.subscribe(_result => result = _result);

      tick(299);
      expect(result).toBe(null);
      tick(300);
      expect(result).toEqual(expectedResult);
    }));
  });
});
