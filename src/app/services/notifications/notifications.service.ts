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
import {HttpClient} from '../http/http.service';
import {Observable} from 'rxjs';
import {EmailConfiguration} from "./domain/email-configuration.model";
import {SmsConfiguration} from "./domain/sms-configuration.model";

@Injectable()
export class NotificationsService {

  constructor(private http: HttpClient, @Inject('notificationsBaseUrl') private baseUrl: string) {
  }

  public createSmsConfiguration(smsConfiguration: SmsConfiguration): Observable<void> {
    return this.http.post(`${this.baseUrl}/configuration/sms`, smsConfiguration);
  }

  public findSmsConfiguration(identifier: string, silent?: boolean): Observable<SmsConfiguration> {
    return this.http.get(`${this.baseUrl}/configuration/sms/${identifier}`, {}, silent);
  }

  public modifySmsConfiguration(smsConfiguration: SmsConfiguration): Observable<void> {
    return this.http.put(`${this.baseUrl}/configuration/sms/${smsConfiguration.identifier}`, smsConfiguration);
  }

  public deleteSmsConfiguration(identifier: string): Observable<void> {
    return this.http.delete(`${this.baseUrl}/configuration/sms/${identifier}`);
  }

  public createEmailConfiguration(emailConfiguration: EmailConfiguration): Observable<void> {
    return this.http.post(`${this.baseUrl}/configuration/email`, emailConfiguration);
  }

  public findEmailConfiguration(identifier: string, silent?: boolean): Observable<EmailConfiguration> {
    return this.http.get(`${this.baseUrl}/configuration/email/${identifier}`, {}, silent);
  }

  public modifyEmailConfiguration(emailConfiguration: EmailConfiguration): Observable<void> {
    return this.http.put(`${this.baseUrl}/configuration/email/${emailConfiguration.identifier}`, emailConfiguration);
  }

  public deleteEmailConfiguration(identifier: string): Observable<void> {
    return this.http.delete(`${this.baseUrl}/configuration/email/${identifier}`);
  }
}
