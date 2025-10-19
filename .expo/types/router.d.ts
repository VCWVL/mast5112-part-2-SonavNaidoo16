/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/AddDishScreen`; params?: Router.UnknownInputParams; } | { pathname: `/HelpScreen`; params?: Router.UnknownInputParams; } | { pathname: `/HomeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/RemoveDishScreen`; params?: Router.UnknownInputParams; } | { pathname: `/types`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/AddDishScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/HelpScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/HomeScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/RemoveDishScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/types`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/AddDishScreen${`?${string}` | `#${string}` | ''}` | `/HelpScreen${`?${string}` | `#${string}` | ''}` | `/HomeScreen${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/RemoveDishScreen${`?${string}` | `#${string}` | ''}` | `/types${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/AddDishScreen`; params?: Router.UnknownInputParams; } | { pathname: `/HelpScreen`; params?: Router.UnknownInputParams; } | { pathname: `/HomeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/RemoveDishScreen`; params?: Router.UnknownInputParams; } | { pathname: `/types`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}
