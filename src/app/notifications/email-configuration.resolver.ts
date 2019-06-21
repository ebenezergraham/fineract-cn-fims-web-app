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
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Ledger} from '../services/accounting/domain/ledger.model';
import {AccountingService} from '../services/accounting/accounting.service';
import {Observable} from 'rxjs';
import {NotificationsService} from "../services/notifications/notifications.service";
import {SmsConfiguration} from "../services/notifications/domain/sms-configuration.model";
import {EmailConfiguration} from "../services/notifications/domain/email-configuration.model";

@Injectable()
export class EmailConfigurationResolver implements Resolve<EmailConfiguration> {

  constructor(private notificationsService: NotificationsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EmailConfiguration> {
    return this.notificationsService.findEmailConfiguration(route.params['id']);
  }
}
