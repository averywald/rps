import Paper from 'paper';
import GameLogicService from './gameLogic.service';

/**
 * @todo implement animations
 * @todo implement game stage layer
 * @todo implement instruction/announcement layer
 * @todo hook up game logic service
 */
export default class PaperService {
    private static project: paper.Project;
    private static canvas: HTMLCanvasElement;
    private static iconLayer: paper.Layer;

    public static init(canvas: HTMLCanvasElement, items: Element[]) {
        PaperService.canvas = canvas;
        PaperService.project = new Paper.Project(PaperService.canvas);

        let iconlayer = new Paper.Layer();
        PaperService.iconLayer = iconlayer; // assign to prop for easy reference

        items.forEach(item => {
            let svg = item as SVGElement;
            iconlayer.importSVG(svg);
        });

        PaperService.project.addLayer(iconlayer);

        PaperService.arrangeIcons();

        PaperService.applyMouseEvents();
    }

    private static arrangeIcons(): void {
        var thirdWidth = PaperService.canvas.width / 3;
        var i = thirdWidth;

        PaperService.iconLayer.children.forEach(icon => {
            icon.scale(0.35);
            // icon.fillColor = new Paper.Color(0, 1, 0);

            icon.position =  new Paper.Point(i - (thirdWidth / 2), PaperService.canvas.height / 2);

            i += thirdWidth;
        });
    }

    private static applyMouseEvents(): void {
        PaperService.iconLayer.children.forEach(icon => {
            icon.onMouseDown = (event: paper.MouseEvent) => {
                event.target.onFrame = PaperService.rotateIcon;
            }
            icon.onMouseUp = (event: paper.MouseEvent) => {
                event.target.onFrame = null; // remove animation
            }
        });
    }

    private static rotateIcon(event: paper.Event, icon: paper.Item): void {
        icon.rotate(3);
    }

    /**
     * 
     * @param performForMsec 
     * @param callback 
     * 
     * @todo: figure out how to perform for, then dispose after interval
     */
    private static applyAnimationForInterval(performForMsec: number, callback: Function) {
        callback();
        setTimeout(() => {
            PaperService.project.activeLayer.children.map(icon => icon.onFrame = null);
        }, performForMsec);
    }

    private static grow(item: paper.Item) {        
        item.onFrame = (event: paper.MouseEvent) => {
            event.target.rotate(3);
        }
    }

    private static shrink(item: paper.Item) {
        item.onFrame = (event: paper.MouseEvent) => {
            event.target.rotate(-4);
        }
    }
}
