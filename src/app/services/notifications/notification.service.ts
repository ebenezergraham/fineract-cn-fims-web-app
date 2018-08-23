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
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SMSConfiguration} from './domain/sms-configuration.model';
import {HttpClient} from '../http/http.service';
import {SMSPage} from './domain/sms-page.model';
import {FetchRequest} from '../domain/paging/fetch-request.model';
import {buildSearchParams} from '../domain/paging/search-param.builder';
import {RequestOptionsArgs, URLSearchParams} from '@angular/http';

@Injectable()
export class NotificationService {

  constructor(@Inject('notificationBaseUrl') private baseUrl: string, private http: HttpClient) {
  }

  fetchSMS(fetchRequest: FetchRequest): Observable<SMSPage> {
    const params: URLSearchParams = buildSearchParams(fetchRequest);

    const requestOptions: RequestOptionsArgs = {
      search: params
    };

    return this.http.get(`${this.baseUrl}/notification/sms`, requestOptions).share();
  }

  getSMSConfiguration(id: string, silent?: boolean): Observable<SMSConfiguration> {
    return this.http.get(`${this.baseUrl}/sms/${id}`, {}, silent);
  }
}
