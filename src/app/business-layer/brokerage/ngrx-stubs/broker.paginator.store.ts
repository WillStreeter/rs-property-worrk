/**
 * Created by willstreeter on 9/11/17.
 */


 import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BrokerActionBuilder } from '../../pubsub-broker/services/broker.action.builder';
import { BrokerAction  } from '../../pubsub-broker/models/broker.action.model';
import * as fromRoot from '../../../data-layer/ngrx-data/reducers/index';
import * as propertyActions from '../../../data-layer/ngrx-data/actions/properties.actions';
import * as portalActions from '../../../data-layer/ngrx-data/actions/portal.actions';
import * as PropertiesActionTypes from '../../shared-types/actions/properties.action.types';
import * as PortalActionTypes from '../../shared-types/actions/portal.action.types';

import { BrokerList } from './brokerlist';


@Injectable()
export class BrokerPaginatorStore {
    brokerLabel: string = BrokerList.BROKER_PAGINATOR_STORE;
    constructor( private store: Store<fromRoot.State>,
                 private brkrActnBuilder: BrokerActionBuilder ) { }

    getComponentSupplies(): any {
       return  Object.assign({
                   brokerLabel: this.brokerLabel,
                   storeObs: {
                        brokerPortalState: this.store.select(fromRoot.getPortalState),
                        brokerCurrentPropertiesCollection: this.store.select(fromRoot.getCurrentPropertiesCollection)
                    },
                   storeDsp: {
                       SET_CURRENT_PAGE_NUMBER: this.brkrActnBuilder.create(  PortalActionTypes.SET_CURRENT_PAGE_NUMBER,
                                                           this.brokerLabel,
                                                             null)
                      }
                });

    }

    dispatchAction(brokerAction: BrokerAction ): void {
         switch (brokerAction.actionType ) {
             case PortalActionTypes.SET_CURRENT_PAGE_NUMBER:
                 this.store.dispatch(new portalActions.SetCurrentPageNumber(brokerAction.payLoad));
             break;
             case PortalActionTypes.UPDATE_VIEWABLE_PER_PAGE_COUNT:
                 this.store.dispatch(new portalActions.UpdateViewablePerPageCount(brokerAction.payLoad));
             break;
         }
    }
}

