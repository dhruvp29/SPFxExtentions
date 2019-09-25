import { override } from '@microsoft/decorators';
import { Log, UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AppCustomizer.module.scss';

import { sp, CamlQuery } from "@pnp/sp";
import * as strings from 'HelloWorldApplicationCustomizerStrings';
import { objectDefinedNotNull } from '@pnp/common';
import * as jQuery from 'jquery';
require('mutationobserver-shim');
const LOG_SOURCE: string = 'HelloWorldApplicationCustomizer';
let _observer: MutationObserver;
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloWorldApplicationCustomizerProperties {
  // This is an example; replace with your own property
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HelloWorldApplicationCustomizer
  extends BaseApplicationCustomizer<IHelloWorldApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {

    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    console.log("Init Called");
   this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
    console.log(`LCEVENT:onInit=${window.location.href}`);

    return Promise.resolve();
  }

  private async _renderPlaceHolders(): Promise<void> {
        this._loadFooter();
  }

  private _onDispose(): Promise<void> {

    return Promise.resolve();
  }

  private _loadFooter(): void {
  
    let queryParms = new UrlQueryParameterCollection(window.location.href);
    let myParm: string = decodeURIComponent(queryParms.getValue("id"));
    let folderUrl: string = '';
    if (myParm !== undefined) {
      folderUrl = decodeURIComponent(queryParms.getValue("id"));
      console.log("FolderURL:" + myParm);
    }

      console.log("HelloWorldApplicationCustomizer._renderPlaceHolders()");
      console.log(
        "Available placeholders: ",
        this.context.placeholderProvider.placeholderNames
          .map(name => PlaceholderName[name])
          .join(", ")
      );

      // Handling the bottom placeholder
      //if (!this._bottomPlaceholder) 
      {
        const bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          { onDispose: this._onDispose }
        );

        // The extension should not assume that the expected placeholder is available.
        if (!bottomPlaceholder) {
          console.error("The expected placeholder (Bottom) was not found.");
          return;
        }

        if (this.properties) {
          let bottomString: string = "Folders :" + folderUrl ;
          if (!bottomString) {
            bottomString = "(Bottom property was not defined.)";
          }

          if (bottomPlaceholder.domElement) {
            bottomPlaceholder.domElement.innerHTML = `
                  <div class="${styles.app}">
                    <div class="${styles.bottom}">
                      <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(
              bottomString
            )}
                    </div>
                  </div>`;
          }
        }
      }
    
  }
}