import { Icon } from "../contracts/open-weather/IForecast";

export class ImgAssetsUtil {
    static getIconName(enumIcon: Icon): string {
      let icon: string;
  
      switch (enumIcon) {
        case Icon.Icon03D:
        case Icon.Icon03N:
          icon = '03';
          break;
        case Icon.Icon04D:
        case Icon.Icon04N:
          icon = '04';
          break;
        case Icon.Icon09D:
        case Icon.Icon09N:
        case Icon.Icon10D:
        case Icon.Icon10N:
          icon = '10';
          break;
        case Icon.Icon11D:
        case Icon.Icon11N:
          icon = '11';
          break;
        case Icon.Icon13D:
        case Icon.Icon13N:
          icon = '13';
          break;
        case Icon.Icon50D:
        case Icon.Icon50N:
          icon = '50';
          break;
        default:
          icon = enumIcon.toString();
          break;
      }
  
      return icon;
    }
    
    static getUrlIcon(enumIcon: Icon): string {
      return `/assets/icons/${ImgAssetsUtil.getIconName(enumIcon)}.png`;
    }
}