import Paper from 'paper';
import GameLogicService from './gameLogic.service';
import Weapon from '@/models/weapon.model';

/**
 * @todo implement animation layers
 * - background fill: win/loss
 * - hover spotlight
 * - countdown?
 */
export default class PaperService {

    private static project: paper.Project;
    private static canvas: HTMLCanvasElement;
    private static iconLayer: paper.Layer;
    private static backgroundLayer: paper.Layer;
    private static animationLayer: paper.Layer;

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

        // PaperService.project.selectAll(); // DEBUG
    }

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

    private static arrangeIcons(): void {
        // divide canvas into 3rds - space for each RPS icon
        var thirdWidth = PaperService.canvas.width / 3;
        var i = thirdWidth; // iterator for "painting" the canvas

        PaperService.iconLayer.children.forEach(icon => {
            icon.scale(0.2); // shrink icons to fit page
            icon.fillColor = new Paper.Color(0, 0, 0); // make them black
            // place icon in the center of its respective 3rd
            icon.position =  new Paper.Point(i - (thirdWidth / 2), PaperService.canvas.height / 2);
            i += thirdWidth; // move "paintbrush" to new 3rd of canvas
        });
    }

    /**
     * set up each icon with user interaction listeners
     * 
     * @todo ensure that the game state is ready to accept a weapon selection
     * @todo mouseEnter => grow?
     * @todo mouseLeave => shrink?
     */
    private static applyMouseEvents(): void {
        PaperService.project.activeLayer.children.forEach(icon => {
            icon.onClick = PaperService.selectWeapon;
            icon.onMouseEnter = PaperService.grow;
            icon.onMouseLeave = PaperService.shrink;
            // icon.onMou
        });
    }

    /**
     * mark icon as selected in the UI;
     * 
     * dispatch the GameLogicService to update store,
     * and run through a round
     *  
     * @todo animate icon!!!
     */
    private static selectWeapon(event: paper.MouseEvent): void {
        let item = PaperService.getIconById(event.target.id);
        if (item) {
            item.tween({
                'style.fillColor': new Paper.Color(1, 0, 0)
            }, {
                easing: 'easeInOutCubic',
                duration: 2000
            });
            GameLogicService.runRound(Weapon[item.name as keyof typeof Weapon]);
        }
    }

    private static grow(event: paper.MouseEvent): void {
        let item = PaperService.getIconById(event.target.id);
        if (item) {
            item.tween({
                scaling: 1.1,
                'style.fillColor': new Paper.Color(0.9, 0.9, 0.9)
            }, {
                easing: 'easeInCubic',
                duration: 200
            });
        }
    }

    private static shrink(event: paper.MouseEvent): void {
        let item = PaperService.getIconById(event.target.id);
        if (item) {
            item.tween({
                scaling: 0.9,
                'style.fillColor': new Paper.Color(0, 0, 0)
            }, {
                easing: 'easeInCubic',
                duration: 200
            });
        }
    }
}
