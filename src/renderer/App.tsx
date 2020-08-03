import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import { parseXml } from '../parser/xml-parser';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

const App = () => {
    const [roster, setRoster] = useState<RosterAttributes>();
    const [costs, setCosts] = useState<Costs[]>([]);
    const [forces, setForces] = useState<Forces[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await parseXml();
            setRoster(data[0]?.roster.$);
            setCosts(data[0]?.roster.costs || []);
            setForces(data[0]?.roster.forces || []);
        };

        fetchData().then();
    }, []);

    return (
        <>
            <nav>Battlebuddy</nav>
            <main>
                {roster && (
                    <>
                        <header>
                            <h1>{roster.name}</h1>
                            <p>
                                {roster.gameSystemName} (rev{roster.gameSystemRevision})
                            </p>
                            <p>Generated using Battlescribe (v{roster.battleScribeVersion})</p>
                            {costs.flatMap(({ cost }) =>
                                cost.flatMap(({ $: $cost }, i) => (
                                    <p key={i}>
                                        <strong>Cost:</strong> {$cost.value}
                                        {$cost.name}
                                    </p>
                                ))
                            )}
                        </header>
                        <section className="app__forces">
                            <h2>Forces</h2>
                            {forces.flatMap((f) =>
                                f.force.flatMap(({ $: $force, rules, selections }: Force) => (
                                    <div key={$force.id} className="app__force">
                                        <h3>
                                            {$force.name} {$force.catalogueName} (rev
                                            {$force.catalogueRevision})
                                        </h3>

                                        <h4>Rules</h4>
                                        <ul className="app__force-rules">
                                            {rules.flatMap(({ rule }: Rules) =>
                                                rule.flatMap(
                                                    ({ $: $rule, description }: Rule) =>
                                                        $rule.hidden !== 'true' && (
                                                            <li
                                                                key={$rule.id}
                                                                className="app__force-rule">
                                                                <strong>{$rule.name}: </strong>
                                                                <span>
                                                                    {description.flatMap(
                                                                        (d) => `${d}`
                                                                    )}
                                                                </span>
                                                            </li>
                                                        )
                                                )
                                            )}
                                        </ul>

                                        <h4>Selections</h4>
                                        <ul className="app__force-selections">
                                            {selections.flatMap(({ selection }: Selections) =>
                                                selection.flatMap(
                                                    ({ $: $selection }: Selection) => (
                                                        <li
                                                            key={$selection.id}
                                                            className="app__force-selection">
                                                            {JSON.stringify($selection)}
                                                        </li>
                                                    )
                                                )
                                            )}
                                        </ul>
                                    </div>
                                ))
                            )}
                        </section>
                    </>
                )}
            </main>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <AppContainer>
            <App />
        </AppContainer>
    </React.StrictMode>,
    rootElement
);
