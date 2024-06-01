import React from "react";
import { ScrollView } from "react-native";
import { Figure } from "./Figure";
import { Wallet } from "@/Services/wallets";
import { Transaction } from "@/Services/transactions";
import { Report } from "./Report";
import { Recent } from "./Recent";

export interface IHomeProps {
	wallets: Wallet[],
	transactions: Transaction[]
}

export const Home = ({ wallets, transactions }: IHomeProps) => {

	const balance = wallets.reduce((total, wal) => total + wal.amount, 0);
	const income = transactions.filter(trans => !trans.is_pay).reduce((total, trans) => total + trans.amount, 0);
	const expense = transactions.filter(trans => trans.is_pay).reduce((total, trans) => total + trans.amount, 0);

    return (
      	<ScrollView>
			<Figure 
				balance={balance}
				income={income}
				expense={expense}
			/>
			<Report expenseTransactions={transactions.filter(trans => trans.is_pay)} />
			{/* <Recent transactions={transactions}/> */}
      	</ScrollView>
    )
};
