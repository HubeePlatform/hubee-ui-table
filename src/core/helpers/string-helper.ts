export default class StringHelper {
    static format(...text: string[]): string {
        let result = '';
        const list = text[0].split(/{[\d]}/);
        const args = Array.prototype.slice.call(text, 1);

        for (let i = 0; i < list.length; i += 1)
            result += list[i] + (args[i] !== undefined ? args[i] : '');

        return result;
    }

    static pluralize = ({ noun = '', count = 1, suffix = 's' }) =>
        `${noun}${count > 1 ? suffix : ''}`;

    static capitalize(text: string): string {
        if (typeof text !== 'string') return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}
