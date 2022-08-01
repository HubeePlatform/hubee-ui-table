import { ITableSearchService } from '@/core/interfaces';
import React, { useEffect, forwardRef } from 'react';
import { Row } from 'react-table';

interface Props {
    isHeader: boolean;
    row?: Row<any>;
    indeterminate?: boolean;
    service: ITableSearchService;
}

const useCombinedRefs = (...refs: any[]): React.MutableRefObject<any> => {
    const targetRef = React.useRef();

    React.useEffect(() => {
        refs.forEach(ref => {
            if (!ref) return;

            if (typeof ref === 'function') {
                ref(targetRef.current);
            } else {
                ref.current = targetRef.current;
            }
        });
    }, [refs]);

    return targetRef;
};

const IndeterminateCheckbox = forwardRef<HTMLInputElement, Props>(
    (
        { indeterminate, isHeader, service, row, ...rest },
        ref: React.Ref<HTMLInputElement>,
    ) => {
        const defaultRef = React.useRef(null);
        const combinedRef = useCombinedRefs(ref, defaultRef);

        useEffect(() => {
            if (combinedRef?.current) {
                combinedRef.current.indeterminate = indeterminate ?? false;
            }
        }, [combinedRef, indeterminate]);

        return (
            <React.Fragment>
                {isHeader && (
                    <input
                        data-is-header={isHeader}
                        className="table-cell-select"
                        type="checkbox"
                        ref={combinedRef}
                        {...rest}
                    />
                )}
                {!isHeader && (
                    <input
                        data-is-header={isHeader}
                        disabled={service.verifyDisableRowSelected(
                            row?.original,
                        )}
                        className="table-cell-select"
                        type="checkbox"
                        ref={combinedRef}
                        {...rest}
                    />
                )}
            </React.Fragment>
        );
    },
);

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';

export default IndeterminateCheckbox;
