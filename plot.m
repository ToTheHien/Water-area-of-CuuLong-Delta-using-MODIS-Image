%% Matlab
clc 
clear all
close all

% Define dry/wet array
% Input the number manually
dry = [42419, 22500, 32694, 22122, 29056, 48172, 33325, 36663, 54242, 28646, 43596, 63902, 47316, 106403, 44937, 43957, 58397, 36352, 53423, 28695];
wet = [417394, 453465, 399019, 362179, 526018, 499896, 742800, 499407, 623650, 680481, 488864, 690808, 396652, 492586, 601059, 423847, 400990, 685306, 516752, 393111];
n_d = 2001:2020;
n_w = 2000:2019;

%Plot dry/wet season
figure(1)
plot(n_d,dry,'-b.','LineWidth',1.5,'MarkerSize',15)
hold on
grid on
plot(n_w,wet,'-g.','LineWidth',1.5,'MarkerSize',15)
legend('dry','wet')
title('Cuu Long Delta from 2000 to 2020')
ylabel('Water Area [hecta]')
xlabel('Year')
