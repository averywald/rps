import Paper from 'paper';
import GameLogicService from './gameLogic.service';
import Weapon from '@/models/weapon.model';

/**
 * @todo implement animations
 * @todo implement game stage layer
 * @todo implement instruction/announcement layer
 */
export default class PaperService {

    private static project: paper.Project;
    private static canvas: HTMLCanvasElement;
    private static iconLayer: paper.Layer;

    /**
     *
     * @param id the ID of the Paper.js item object
     * @returns Paper.js Item, or nothing if ID not found;
     * Before operating on the return value, a sanity-check should be done
     */
    private static getIconById(id: number): paper.Item | null {
        let item = PaperService.iconLayer.children.find(item => item.id === id);
        return item ? item : null;
    }

    /**
     * Sets up the service's Paper.js project on the provided canvas
     * 
     * @param canvas HTML Canvas element to bind to Paper.js project
     * @param items the SVG elements to add to Paper.js
     */
    public static init(canvas: HTMLCanvasElement, items: Element[]) {
        PaperService.canvas = canvas;
        PaperService.project = new Paper.Project(PaperService.canvas);

        let iconlayer = new Paper.Layer();
        PaperService.iconLayer = iconlayer; // assign to prop for easy reference

        items.forEach((item, index) => {
            let svg = item as SVGElement;
            let paperItem = iconlayer.importSVG(svg);
            paperItem.name = Weapon[index]; // assign name from Weapon enum
        });

        PaperService.project.addLayer(iconlayer);
        PaperService.arrangeIcons();
        PaperService.applyMouseEvents();

        PaperService.project.selectAll(); // DEBUG
    }

    private static arrangeIcons(): void {
        var thirdWidth = PaperService.canvas.width / 3;
        var i = thirdWidth;

        PaperService.iconLayer.children.forEach(icon => {
            icon.scale(0.2);
            icon.fillColor = new Paper.Color(0, 0, 0);

            icon.position =  new Paper.Point(i - (thirdWidth / 2), PaperService.canvas.height / 2);

            i += thirdWidth;
        });
    }

    private static applyMouseEvents(): void {
        PaperService.project.activeLayer.children.forEach(icon => {
            /**
             * @todo ensure that the game state is ready to accept a weapon selection
             */
            icon.onMouseDown = PaperService.selectWeapon;
        });
    }

    private static selectWeapon(event: paper.MouseEvent): void {
        let item = PaperService.getIconById(event.target.id);
        if (item) {
            GameLogicService.runRound(Weapon[item.name as keyof typeof Weapon]);
        }
    }

    // private static rotateIcon(event: paper.MouseEvent): void {
    //     let item = PaperService.getIconById(event.target.id);

    //     if (item) {
    //         item.onFrame = (item: paper.Item, event: paper.Event) => PaperService.rotate;
    //         setTimeout(PaperService.removeAnimation, 3000, item);
    //     }
    // }

    // private static removeAnimation(item: paper.Item) {
    //     item.onFrame = null;
    // }

    // private static rotate(item: paper.Item): void {        
    //     item.rotate(3);
    // }
}
