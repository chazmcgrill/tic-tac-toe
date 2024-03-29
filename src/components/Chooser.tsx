import { Token } from '../types';

interface ChooserProps {
    onChooserClick: (event: any) => void;
}

const Chooser = ({ onChooserClick }: ChooserProps) => (
    <div className="chooser">
        <h3>choose your token</h3>
        <div className="chooser-button" id={Token.X} onClick={onChooserClick}>
            X
        </div>
        <div className="chooser-button" id={Token.O} onClick={onChooserClick}>
            O
        </div>
    </div>
);

export default Chooser;
