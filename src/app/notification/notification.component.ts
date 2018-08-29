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
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FetchRequest} from '../services/domain/paging/fetch-request.model';
import {TableData, TableFetchRequest} from '../common/data-table/data-table.component';
import {SMSConfiguration} from '../services/notifications/domain/sms-configuration.model';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../store';
import {SEARCH} from '../store/customer/customer.actions';
import {NotificationStore} from './store/index';

@Component({
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {

  smsData$: Observable<TableData>;

  loading$: Observable<boolean>;

  columns: any[] = [
    { name: 'id', label: 'Id' },
    { name: 'identifier', label: 'Account' },
    { name: 'option', label: 'Option' }
  ];

  private searchTerm: string;

  private lastFetchRequest: FetchRequest = {};

  constructor(private router: Router, private route: ActivatedRoute, private store: NotificationStore) {}

  ngOnInit(): void {
    this.smsData$ = this.store.select(fromRoot.getSMSSearchResults)
      .map(smsPage => ({
        data: smsPage.customers,
        totalElements: smsPage.totalElements,
        totalPages: smsPage.totalPages
      }));

    this.loading$ = this.store.select(fromRoot.getCustomerSearchLoading);

    this.route.queryParams.subscribe((params: Params) => {
      this.search(params['term']);
    });
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.fetchCustomers();
  }

  rowSelect(customer: Customer): void {
    this.router.navigate(['detail', customer.identifier], { relativeTo: this.route });
  }

  fetchCustomers(fetchRequest?: TableFetchRequest): void {
    if (fetchRequest) {
      this.lastFetchRequest = fetchRequest;
    }

    this.lastFetchRequest.searchTerm = this.searchTerm;

    this.store.dispatch({ type: SEARCH, payload: this.lastFetchRequest });
  }

  goToTasks(): void {
    this.router.navigate(['tasks'], { relativeTo: this.route });
  }
}
